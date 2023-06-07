import { ChangeEvent, FC } from "react";
import styles from "./NoteTextArea.module.css";
import { useEditor } from "../../hooks/useEditor";

export const NoteTextArea: FC = () => {
  const { text, setText } = useEditor();

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setText(value);
  }

  return (
    <textarea className={styles.textarea} value={text} onChange={handleChange} />
  );
}