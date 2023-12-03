import { FC } from 'react';
import { Note } from '../Note/Note';
import { useParams } from 'react-router-dom';
import { useNote } from '../../data';

export const Main: FC = () => {
  const { noteTitle } = useParams<{ noteTitle: string }>();
  const { data: note, isLoading, isSuccess } = useNote(noteTitle);

  if (isLoading) return null;

  if (isSuccess) return (
    <Note content={note.content} />
  )

  return null;
};
