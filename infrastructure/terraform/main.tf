terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "production"
}

variable "db_username" {
  default = "civitas_user"
}

# Generate secure random RDS password
resource "random_password" "rds_password" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

# 1. VPC Network Architecture
resource "aws_vpc" "civitas_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "civitas-vpc-${var.environment}"
  }
}

resource "aws_subnet" "public_subnets" {
  count                   = 2
  vpc_id                  = aws_vpc.civitas_vpc.id
  cidr_block              = cidrsubnet(aws_vpc.civitas_vpc.cidr_block, 8, count.index)
  map_public_ip_on_launch = true
  availability_zone       = element(["us-east-1a", "us-east-1b"], count.index)

  tags = {
    Name = "civitas-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 2
  vpc_id            = aws_vpc.civitas_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.civitas_vpc.cidr_block, 8, count.index + 2)
  availability_zone = element(["us-east-1a", "us-east-1b"], count.index)

  tags = {
    Name = "civitas-private-subnet-${count.index + 1}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.civitas_vpc.id

  tags = {
    Name = "civitas-igw"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.civitas_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "civitas-public-rt"
  }
}

resource "aws_route_table_association" "public_assoc" {
  count          = 2
  subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
  route_table_id = aws_route_table.public_rt.id
}

# 2. Security Groups
resource "aws_security_group" "ec2_sg" {
  name        = "civitas-ec2-sg"
  description = "Allow HTTP/HTTPS traffic to application nodes"
  vpc_id      = aws_vpc.civitas_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "civitas-rds-sg"
  description = "Allow DB access from EC2 nodes"
  vpc_id      = aws_vpc.civitas_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "redis_sg" {
  name        = "civitas-redis-sg"
  description = "Allow Redis access from EC2 nodes"
  vpc_id      = aws_vpc.civitas_vpc.id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Target OS Amazon Linux 2023 EC2
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_instance" "app_server" {
  count                       = 2
  ami                         = data.aws_ami.amazon_linux_2023.id
  instance_type               = "c6i.xlarge"  # Compute optimized for forecasting
  subnet_id                   = element(aws_subnet.public_subnets[*].id, count.index)
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo dnf update -y
              sudo dnf install -y docker git htop curl nginx
              sudo systemctl enable --now docker
              sudo systemctl enable --now nginx
              sudo usermod -aG docker ec2-user
              EOF

  tags = {
    Name = "civitas-app-node-${count.index + 1}"
  }
}

# 4. RDS PostgreSQL Primary
resource "aws_db_subnet_group" "rds_subnets" {
  name       = "civitas-rds-subnet-group"
  subnet_ids = aws_subnet.private_subnets[*].id
}

resource "aws_db_instance" "postgres" {
  identifier             = "civitas-postgres-prod"
  allocated_storage      = 100
  max_allocated_storage  = 1000
  engine                 = "postgres"
  engine_version         = "16.1"
  instance_class         = "db.m6i.xlarge"
  db_name                = "civitas_prod"
  username               = var.db_username
  password               = random_password.rds_password.result
  db_subnet_group_name   = aws_db_subnet_group.rds_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  multi_az               = true
}

# 5. ElastiCache Redis
resource "aws_elasticache_subnet_group" "redis_subnets" {
  name       = "civitas-redis-subnet-group"
  subnet_ids = aws_subnet.private_subnets[*].id
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "civitas-redis-prod"
  engine               = "redis"
  node_type            = "cache.m6i.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  subnet_group_name    = aws_elasticache_subnet_group.redis_subnets.name
  security_group_ids   = [aws_security_group.redis_sg.id]
}

# 6. S3 Bucket & CloudFront CDN
resource "aws_s3_bucket" "static_assets" {
  bucket_prefix = "civitasai-assets-"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.static_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "civitas-s3-oac"
  description                       = "OAC for Civitas S3 Assets"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.static_assets.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# Outputs
output "app_server_public_ips" {
  value = aws_instance.app_server[*].public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "rds_password_secret" {
  value     = random_password.rds_password.result
  sensitive = true
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
