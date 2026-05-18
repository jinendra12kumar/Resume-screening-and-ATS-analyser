from jose import jwt, JWTError
from typing import List
from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_token


from app.db.models.users import User


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    decoded=decode_token(token)
    if not decoded:
        raise credentials_exception
    
    if decoded.get("type")!= "access":
        raise credentials_exception
    
    user_id=decoded.get("sub")

    if user_id is None:
        raise credentials_exception 

    result = await db.execute(
        select(User).where(User.id == user_id)
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise credentials_exception

    return user

def require_roles(allowed_roles: List[str]):

    async def role_checker(
        current_user: User = Depends(get_current_user)
    ):

        if current_user.role.value not in allowed_roles:

            raise HTTPException(
                status_code=403,
                detail="Permission denied"
            )

        return current_user

    return role_checker