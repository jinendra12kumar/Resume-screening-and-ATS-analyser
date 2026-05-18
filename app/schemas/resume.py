from pydantic import BaseModel
from uuid import UUID


class ResumeResponseSchema(BaseModel):

    id: UUID

    original_filename: str

    file_size: int

    mime_type: str

    upload_status: str

    parsing_status: str

    class Config:
        from_attributes = True