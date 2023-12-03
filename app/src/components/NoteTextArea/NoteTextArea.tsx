import { ChangeEvent, FC } from "react";
import styles from "./NoteTextArea.module.css";
import { Note } from "../../api";

export type NoteTextAreaProps = Pick<Note, 'content'>;

export const NoteTextArea: FC<NoteTextAreaProps> = ({ content = '' }) => {

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    // setText(value);
  }

  return (
    <textarea className={styles.textarea} value={content} onChange={handleChange} />
  );
}