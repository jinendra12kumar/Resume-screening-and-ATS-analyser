from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.auth import (
    RegisterSchema,
    LoginSchema,
    TokenSchema
)

from app.services.auth_service import AuthService
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register(
    payload: RegisterSchema,
    db: AsyncSession = Depends(get_db)
):

    try:
        user = await AuthService.register_user(
            db,
            payload
        )

        return {
            "message": "User registered successfully",
            "user_id": str(user.id)
        }

    except Exception as e:
        print("Error",e)
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login", response_model=TokenSchema)
async def login(
    payload: LoginSchema,
    db: AsyncSession = Depends(get_db)
):

    user = await AuthService.authenticate(
        db,
        payload.email,
        payload.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "sub": str(user.id),
        "role": user.role.value
    })

    return {
        "access_token": token
    }