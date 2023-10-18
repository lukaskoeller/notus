from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    is_active = Column(Boolean)

    notes = relationship("Note", back_populates="items")


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    fileName = Column(String)
    created_at = Column(Date)
    updated_at = Column(Date)

    author = relationship("User", back_populates="notes")
    author_id = Column(String, ForeignKey("users.id"))
