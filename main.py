from typing import Optional, List, Annotated, Type

from contextlib import asynccontextmanager
from fastapi import Body, FastAPI, HTTPException
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from re import sub

def toKebab(s):
  return '-'.join(
    sub(r"(\s|_|-)+"," ",
    sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: ' ' + mo.group(0).lower(), s)).split())

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    file_name: Optional[str]
    content: str
    created_at: Annotated[datetime | None, Body()] = None
    updated_at: Annotated[datetime | None, Body()] = None

class NoteUpdate(SQLModel):
    title: Optional[str] = None
    file_name: Optional[str] = None
    content: Optional[str] = None

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# https://sqlmodel.tiangolo.com/tutorial/fastapi/simple-hero-api/#:~:text=There%27s%20only%20one,multiple%20interacting%20threads.
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

# see https://fastapi.tiangolo.com/tutorial/cors/#use-corsmiddleware
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    # Add code here for clean up 

@app.get("/notes/", response_model=List[Note])
def get_notes():
    with Session(engine) as session:
        notes = session.exec(select(Note)).all()
        return notes

@app.get("/note/{id}", response_model=Note)
def get_note(id: int):
    with Session(engine) as session:
        note = session.get(Note, id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        return note

@app.post("/note/")
def create_note(note: Note):
    timestamp = datetime.now()
    note.created_at = timestamp
    note.updated_at = timestamp
    note.file_name = toKebab(note.title)
    with Session(engine) as session:
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

@app.patch("/note/{id}")
def update_note(id: int, note: NoteUpdate):
    with Session(engine) as session:
        db_note = session.get(Note, id)
        if not db_note:
            raise HTTPException(status_code=404, detail="Note not found")
        note_data = note.model_dump(exclude_unset=True)
        for key, value in note_data.items():
            setattr(db_note, key, value)
        setattr(db_note, 'updated_at', datetime.now())
        session.add(db_note)
        session.commit()
        session.refresh(db_note)
        return db_note
