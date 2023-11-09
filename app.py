from typing import Optional

# One line of FastAPI imports here later 👈
from sqlmodel import Field, SQLModel, create_engine

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

def main():
    create_db_and_tables()

if __name__ == "__main__":
    main()

