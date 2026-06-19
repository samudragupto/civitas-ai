# CivitasAI Production AWS Deployment Guide

This document outlines the complete procedure for deploying **CivitasAI** onto a highly scalable AWS architecture targeting **Amazon Linux 2023**.

```
+-----------------------------------------------------------------------------------+
|                                 AWS DEPLOYMENT TIER                               |
+-----------------------------------------------------------------------------------+
|  Target Engine:   | Amazon Linux 2023 EC2 Compute Nodes (c6i.xlarge)             |
|  Relational DB:   | Amazon RDS PostgreSQL 16 Multi-AZ Deployment                 |
|  Caching & Queue: | Amazon ElastiCache Redis 7 Enterprise Cache                  |
|  Static Hosting:  | Amazon S3 Storage Buckets                                    |
|  Global Edge CDN: | Amazon CloudFront Distributions                              |
+-----------------------------------------------------------------------------------+
```

## Step 1: Automated Infrastructure Provisioning via Terraform

We provide a highly robust Terraform architecture (`infrastructure/terraform/main.tf`) that configures your dedicated VPC, Subnets, Internet Gateways, Route Tables, Security Groups, EC2 compute nodes, RDS instances, ElastiCache Redis clusters, S3 buckets, and CloudFront CDN.

To execute provisioning:
```bash
cd infrastructure/terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

### Critical Outputs:
- `app_server_public_ips`: Directly map your primary DNS records or Elastic Load Balancers to these endpoints.
- `rds_endpoint`: Update your Kubernetes or Docker environment secrets.
- `cloudfront_domain`: Update your frontend `NEXT_PUBLIC_API_URL` or alias records.

---

## Step 2: Operating System Readiness (Amazon Linux 2023)

When provisioning EC2 nodes manually or verifying user-data bootstrapping, ensure the Amazon Linux 2023 environment includes modern Docker runtimes:
```bash
# Connect to node
ssh -i /path/to/key.pem ec2-user@<ec2-ip-address>

# Verify system updates
sudo dnf update -y

# Verify Docker daemon
sudo systemctl status docker
```

---

## Step 3: Deployment Orchestration

### 1. Rolling Docker Compose Deployment
Transfer your `.env` configuration file to `/app/.env` on the EC2 target nodes.
```bash
docker-compose -f docker-compose.yml up -d --build
```

### 2. Kubernetes EKS Deployment
If targeting Amazon EKS, apply our complete manifest suite (`infrastructure/k8s/complete-production-manifest.yaml`):
```bash
kubectl apply -f infrastructure/k8s/complete-production-manifest.yaml
```
Verify Horizontal Pod Autoscaler (HPA) metrics:
```bash
kubectl get hpa -n civitas-prod
```
