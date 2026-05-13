from fastapi import APIRouter, Depends

from app.api.deps import require_roles

from app.db.models.users import User


router = APIRouter(
    prefix="/recruiter",
    tags=["Recruiter"]
)


@router.get("/dashboard")
async def recruiter_dashboard(
    current_user: User = Depends(
        require_roles(["recruiter", "admin"])
    )
):

    return {
        "message": "Recruiter dashboard"
    }