from typing import Optional, List, Annotated

from fastapi import Body, FastAPI
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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/notes/", response_model=List[Note])
def get_notes():
    with Session(engine) as session:
        notes = session.exec(select(Note)).all()
        return notes

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

# @app.put("/note/{file_name}")
# def update_note(note: Note):
#     note.updated_at = datetime.now()
#     with Session(engine) as session:
#         statement = select(Note).where(Note.id == note.id)
#         results = exec(statement)
#         note = results.one()

#         session.add(note)
#         session.commit()
#         session.refresh(note)
#         return note
