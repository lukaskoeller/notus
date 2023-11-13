from typing import Optional

# One line of FastAPI imports here later 👈
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    file_name: str
    created_at: str
    updated_at: str

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def create_notes():
    note_1 = Note(
        title='Large learnings from small text',
        file_name='learnings',
        created_at='2023-11-09T21:51:34.177Z',
        updated_at='2023-11-09T21:51:34.177Z'
    )
    note_2 = Note(
        title='How to be funny',
        file_name='funny',
        created_at='2023-10-02T18:34:34.177Z',
        updated_at='2023-10-02T18:34:34.177Z'
    )
    note_3 = Note(
        title='Please watch Schuh des Manitu',
        file_name='manitu',
        created_at='2023-09-23T11:41:34.177Z',
        updated_at='2023-09-23T11:41:34.177Z'
    )

    with Session(engine) as session:
        session.add(note_1)
        session.add(note_2)
        session.add(note_3)
                    
        session.commit()

def select_heroes():
    with Session(engine) as session:
        notes = session.exec(select(Note).where(Note.title == "How to be funny")).all()
        print(notes)

def main():
    create_db_and_tables()
    # create_notes()
    select_heroes()

if __name__ == "__main__":
    main()

