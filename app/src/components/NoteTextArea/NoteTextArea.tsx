import { ChangeEvent, FC, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { useNote, useUpdateNote } from "../../data";
import { useParams } from "react-router-dom";

export const NoteTextArea: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data: note, isLoading, isSuccess } = useNote(noteId);
  const [text, setText] = useState(note?.content ?? '');
  const mutationNote = useUpdateNote();

  if (isLoading) return (
    <h2>Loading…</h2>
  )

  if (isSuccess) {
    const handleChange = (e: ChangeEvent) => {
      const value = (e.target as HTMLTextAreaElement).value;
      setText(value);
      const title = value.split('\n')?.[0]?.slice(2) ?? '';
      
      if (noteId) {
        mutationNote.mutate({ content: value, title: title, id: Number(noteId) });
      }
    }
  
    return (
      <textarea className={styles.textarea} value={text} onChange={handleChange} />
    );
  }

  return <div>Error</div>
}