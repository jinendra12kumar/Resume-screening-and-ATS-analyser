import uuid

from sqlalchemy import (
    ForeignKey,
    Float
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from sqlalchemy.dialects.postgresql import (
    UUID,
    JSONB
)

from app.db.base import Base


class ATSAnalysis(Base):

    __tablename__ = "ats_analysis"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    resume_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("resumes.id", ondelete="CASCADE"),
        unique=True
    )

    ats_score: Mapped[float] = mapped_column(
        Float
    )

    issues: Mapped[list] = mapped_column(
        JSONB
    )

    recommendations: Mapped[list] = mapped_column(
        JSONB
    )

    section_scores: Mapped[dict] = mapped_column(
        JSONB
    )

    keyword_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    formatting_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    content_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    resume = relationship("Resume")