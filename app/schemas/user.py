from pydantic import BaseModel, EmailStr
from uuid import UUID

from app.db.models.users import UserRole


class UserResponseSchema(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True