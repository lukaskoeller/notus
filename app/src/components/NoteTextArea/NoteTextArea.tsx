import { ChangeEvent, FC } from "react";
import styles from "./NoteTextArea.module.css";
import { useParams } from "react-router-dom";
import { useNote } from "../../data";

export const NoteTextArea: FC = () => {
  const { noteTitle } = useParams<{ noteTitle: string }>();
  const { data: note } = useNote(noteTitle);

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    // setText(value);
  }

  return (
    <textarea className={styles.textarea} value={note?.content ?? ''} onChange={handleChange} />
  );
}