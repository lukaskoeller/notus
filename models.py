from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    notes = relationship("Note", back_populates="items")


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    fileName = Column(String)
    createdAt = Column(Date)
    updatedAt = Column(Date)

    author = relationship("User", back_populates="notes")
    authorId = Column(String, ForeignKey("users.id"))
