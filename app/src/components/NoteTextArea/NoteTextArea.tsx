import { ChangeEvent, FC, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { useApiReadNote } from "../../data";
import { useEditor } from "../../editorContext/useEditor";

export const NoteTextArea: FC = () => {
  const { updatePendingNote } = useEditor();
  const { data: note, isLoading, isSuccess } = useApiReadNote();
  const [text, setText] = useState<string>(note?.content ?? "");

  if (isLoading) return <h2>Loading…</h2>;

  if (isSuccess) {
    if (!text && note.content) {
      setText(note.content);
    }

    const handleChange = (e: ChangeEvent) => {
      const value = (e.target as HTMLTextAreaElement).value;
      updatePendingNote({ ...note, content: value });
      setText(value);
    };

    return (
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        autoFocus
        onFocus={(event) => {
          const field = event.target as HTMLTextAreaElement;
          field.setSelectionRange(field.value.length, field.value.length);
        }}
      />
    );
  }

  return <div>Error</div>;
};
