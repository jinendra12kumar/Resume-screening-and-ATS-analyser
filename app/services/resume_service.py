import os
import uuid

from fastapi import UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.resume import Resume


ALLOWED_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


class ResumeService:

    UPLOAD_DIR = "uploads/resumes"

    @staticmethod
    async def upload_resume(
        db: AsyncSession,
        user_id,
        file: UploadFile
    ):

        if file.content_type not in ALLOWED_TYPES:

            raise HTTPException(
                status_code=400,
                detail="Only PDF and DOCX files allowed"
            )

        contents = await file.read()

        if len(contents) > MAX_FILE_SIZE:

            raise HTTPException(
                status_code=400,
                detail="File too large"
            )

        ext = os.path.splitext(file.filename)[1]

        unique_filename = f"{uuid.uuid4()}{ext}"

        file_path = os.path.join(
            ResumeService.UPLOAD_DIR,
            unique_filename
        )

        with open(file_path, "wb") as f:
            f.write(contents)

        resume = Resume(
            user_id=user_id,
            original_filename=file.filename,
            stored_filename=unique_filename,
            file_path=file_path,
            file_size=len(contents),
            mime_type=file.content_type
        )

        db.add(resume)

        await db.commit()
        await db.refresh(resume)

        return resume