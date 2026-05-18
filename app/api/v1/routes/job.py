from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db

from app.api.deps import (
    get_current_user,
    require_roles
)

from app.db.models.users import User
from app.db.models.job import Job
from app.db.models.resume import Resume
from app.db.models.resume_data import ResumeData

from app.schemas.job import (
    JobCreateSchema
)

from app.services.job.jd_parser import (
    JobDescriptionParser
)

from app.services.job.matching_engine import (
    JobMatchingEngine
)


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

@router.post("/")
async def create_job(
    payload: JobCreateSchema,
    current_user: User = Depends(
        require_roles(["recruiter", "admin"])
    ),
    db: AsyncSession = Depends(get_db)
):

    parsed = JobDescriptionParser.parse(
        payload.description
    )

    job = Job(
        recruiter_id=current_user.id,
        title=payload.title,
        company_name=payload.company_name,
        description=payload.description,
        extracted_skills=parsed["skills"]
    )

    db.add(job)

    await db.commit()
    await db.refresh(job)

    return {
        "id": str(job.id),
        "skills": parsed["skills"]
    }


@router.post("/{job_id}/match/{resume_id}")
async def match_resume(
    job_id: str,
    resume_id: str,
    current_user: User = Depends(
        require_roles(["recruiter", "admin"])
    ),
    db: AsyncSession = Depends(get_db)
):

    job_result = await db.execute(
        select(Job).where(Job.id == job_id)
    )

    job = job_result.scalar_one_or_none()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    resume_result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id
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

    parsed_resume = parsed_result.scalar_one_or_none()

    if not parsed_resume:

        raise HTTPException(
            status_code=400,
            detail="Resume not parsed"
        )

    result = await JobMatchingEngine.match_resume_to_job(
        db,
        resume,
        parsed_resume,
        job
    )

    return result