import uuid

from sqlalchemy import (
    String,
    Text,
    ForeignKey
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


class Job(Base):

    __tablename__ = "jobs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    recruiter_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE")
    )

    title: Mapped[str] = mapped_column(
        String(255)
    )

    company_name: Mapped[str] = mapped_column(
        String(255)
    )

    description: Mapped[str] = mapped_column(
        Text
    )

    extracted_skills: Mapped[list] = mapped_column(
        JSONB
    )

    recruiter = relationship("User")