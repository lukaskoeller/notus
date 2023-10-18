from pydantic import BaseModel


class NoteBase(BaseModel):
    title: str
    fileName: str
    content: str
    tags: list(str)


class NoteCreate(NoteBase):
    pass


class Note(NoteBase):
    id: int
    author_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    notes: list[Note] = []

    class Config:
        orm_mode = True
