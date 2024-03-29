import { ChangeEvent, FC, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { useNote, useUpdateNote } from "../../data";
import { noteRoute } from "../../router";

export const NoteTextArea: FC = () => {
  const { noteId } = noteRoute.useParams();
  const { data: note, isLoading, isSuccess } = useNote(Number(noteId));
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