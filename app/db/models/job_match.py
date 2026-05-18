import uuid

from sqlalchemy import (
    ForeignKey,
    Float,
    String
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from sqlalchemy.dialects.postgresql import (
    UUID,
    JSONB
)

from app.db.base import Base


class JobMatch(Base):

    __tablename__ = "job_matches"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    resume_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("resumes.id", ondelete="CASCADE")
    )

    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("jobs.id", ondelete="CASCADE")
    )

    semantic_score: Mapped[float] = mapped_column(
        Float
    )

    skill_match_score: Mapped[float] = mapped_column(
        Float
    )

    overall_score: Mapped[float] = mapped_column(
        Float
    )

    matched_skills: Mapped[list] = mapped_column(
        JSONB
    )

    missing_skills: Mapped[list] = mapped_column(
        JSONB
    )

    recommendation: Mapped[str] = mapped_column(
        String(1000)
    )