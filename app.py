from typing import Optional

from fastapi import FastAPI
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
# from sqlalchemy.orm import relationship

# One line of FastAPI imports here later 👈
from sqlmodel import Field, Session, SQLModel, create_engine, select
# from .database import Base

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Column(String, unique=True, index=True)
    file_name = Column(String)
    created_at = Column(Date)
    updated_at = Column(Date)

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

if __name__ == "__main__":
    create_db_and_tables()

