import uuid

from sqlalchemy import ForeignKey, Float

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


class ResumeData(Base):

    __tablename__ = "resume_data"

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

    extracted_email: Mapped[str | None]

    extracted_phone: Mapped[str | None]

    linkedin_url: Mapped[str | None]

    github_url: Mapped[str | None]

    skills: Mapped[list] = mapped_column(JSONB)

    sections: Mapped[dict] = mapped_column(JSONB)

    raw_text: Mapped[str]

    confidence_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    resume = relationship("Resume")