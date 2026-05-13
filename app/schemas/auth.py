from pydantic import BaseModel, EmailStr
from app.db.models.users import UserRole


class RegisterSchema(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"