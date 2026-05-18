from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File
)

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.database import get_db

from app.db.models.users import User

from app.schemas.resume import ResumeResponseSchema

from app.services.resume_service import ResumeService
from app.db.models.resume_data import ResumeData
from app.services.ats.analyzer import (
    ATSAnalyzerService
)

router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)


@router.post(
    "/upload",
    response_model=ResumeResponseSchema
)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):

    resume = await ResumeService.upload_resume(
        db=db,
        user_id=current_user.id,
        file=file
    )

    return resume


@router.post("/{resume_id}/analyze")
async def analyze_resume(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):

    resume_result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
    )

    resume = resume_result.scalar_one_or_none()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    parsed_result = await db.execute(
        select(ResumeData).where(
            ResumeData.resume_id == resume.id
        )
    )

    parsed_data = parsed_result.scalar_one_or_none()

    if not parsed_data:

        raise HTTPException(
            status_code=400,
            detail="Resume must be parsed first"
        )

    result = await ATSAnalyzerService.analyze_resume(
        db,
        resume,
        parsed_data
    )

    return result

