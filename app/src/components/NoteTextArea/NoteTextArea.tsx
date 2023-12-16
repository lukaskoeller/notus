import { ChangeEvent, FC, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { Note } from "../../api";
import { useUpdateNote } from "../../data";
import { useParams } from "react-router-dom";

export type NoteTextAreaProps = Pick<Note, 'content'>;

export const NoteTextArea: FC<NoteTextAreaProps> = ({ content = '' }) => {
  const [text, setText] = useState(content);
  const { noteTitle } = useParams<{ noteTitle: string }>();
  const mutationNote = useUpdateNote();
  

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setText(value);
    if (noteTitle) {
      mutationNote.mutate({ content: value, title: noteTitle });
    }
  }

  return (
    <textarea className={styles.textarea} value={text} onChange={handleChange} />
  );
}