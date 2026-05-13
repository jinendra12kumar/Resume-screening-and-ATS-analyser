from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.users import User
from app.schemas.auth import RegisterSchema
from app.core.security import (
    hash_password,
    verify_password
)


class AuthService:

    @staticmethod
    async def register_user(
        db: AsyncSession,
        payload: RegisterSchema
    ):

        result = await db.execute(
            select(User).where(User.email == payload.email)
        )

        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise Exception("User already exists")

        user = User(
            full_name=payload.full_name,
            email=payload.email,
            password_hash=hash_password(payload.password),
            role=payload.role
        )

        db.add(user)

        await db.commit()
        await db.refresh(user)

        return user

    @staticmethod
    async def authenticate(
        db: AsyncSession,
        email: str,
        password: str
    ):

        result = await db.execute(
            select(User).where(User.email == email)
        )

        user = result.scalar_one_or_none()

        if not user:
            return None

        if not verify_password(
            password,
            user.password_hash
        ):
            return None

        return user