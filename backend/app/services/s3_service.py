import boto3
import uuid
import os

BUCKET_NAME = "civitas-ai-frontend-arrhat"

CLOUDFRONT_URL = os.getenv(
    "CLOUDFRONT_URL",
    "https://d2l8o52gu44caw.cloudfront.net"
)

s3 = boto3.client("s3")


def upload_file(file_obj, folder="uploads"):
    filename = f"{uuid.uuid4()}_{file_obj.filename}"

    key = f"{folder}/{filename}"

    s3.upload_fileobj(
        file_obj.file,
        BUCKET_NAME,
        key
    )

    return {
        "filename": filename,
        "s3_key": key,
        "url": f"{CLOUDFRONT_URL}/{key}"
    }
