from fastapi import APIRouter, UploadFile, File
from app.services.s3_service import upload_file

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    result = upload_file(file)
    return result
