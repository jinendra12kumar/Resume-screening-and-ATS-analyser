from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.database import engine
from app.db.base import Base
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.users import router as user_router
from app.api.v1.routes.recruiter import (router as recruiter_router)


@asynccontextmanager
async def lifespan(app):

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield


app = FastAPI(
    title="AI Resume Screening API",
    lifespan=lifespan
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(recruiter_router)

@app.get("/")
async def root():
    return {"message": "API Running"}