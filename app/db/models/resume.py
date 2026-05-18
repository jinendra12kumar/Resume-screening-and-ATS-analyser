import uuid

from sqlalchemy import (
    String,
    ForeignKey,
    BigInteger
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class Resume(Base):

    __tablename__ = "resumes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE")
    )

    original_filename: Mapped[str] = mapped_column(
        String(255)
    )

    stored_filename: Mapped[str] = mapped_column(
        String(255),
        unique=True
    )

    file_path: Mapped[str] = mapped_column(
        String(1000)
    )

    file_size: Mapped[int] = mapped_column(
        BigInteger
    )

    mime_type: Mapped[str] = mapped_column(
        String(100)
    )

    upload_status: Mapped[str] = mapped_column(
        String(50),
        default="uploaded"
    )

    parsing_status: Mapped[str] = mapped_column(
        String(50),
        default="pending"
    )

    user = relationship("User")