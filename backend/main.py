from typing import List

from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class Note(BaseModel):
    title: str
    subtitle: str
    content: str | None = None
    createdAt: datetime
    tags: List[str] = []
    id: UUID


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/note/")
def create_note(note: Note):
    return note
