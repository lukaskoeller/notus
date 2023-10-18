from typing import List

from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class Note(BaseModel):
    title: str
    subtitle: str
    content: str | None = None
    created_at: datetime
    tags: List[str] = []
    id: UUID


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/notes/")
def read_root():
    return [
      {
          "title": "my title",
          "subtitle": "string",
          "content": "string",
          "created_at": "2019-08-24T14:15:22Z",
          "tags": [
              "uschi",
              "hallo"
          ],
          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
      },
      {
          "title": "Jurassic Park Superpower",
          "subtitle": "string",
          "content": "string",
          "created_at": "2019-08-24T14:15:22Z",
          "tags": [
              "uschi",
              "hallo"
          ],
          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
      },
      {
          "title": "All Marvel Movies",
          "subtitle": "string",
          "content": "string",
          "created_at": "2019-08-24T14:15:22Z",
          "tags": [
              "uschi",
              "hallo"
          ],
          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
      }
    ]


@app.post("/note/")
def create_note(note: Note):
    return note
