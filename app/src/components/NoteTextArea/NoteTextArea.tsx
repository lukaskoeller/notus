import { ChangeEvent, FC } from "react";
import styles from "./NoteTextArea.module.css";
import { useReadNote } from "../../data";
import { useEditor } from "../../editorContext/useEditor";

export const NoteTextArea: FC = () => {
  const { updatePendingNote } = useEditor();
  const { data: note, isLoading, isSuccess } = useReadNote();

  if (isLoading) return <h2>Loading…</h2>;

  if (isSuccess) {
    const handleChange = (e: ChangeEvent) => {
      const value = (e.target as HTMLTextAreaElement).value;
      updatePendingNote({ ...note, content: value });
    };

    return (
      <textarea
        key={note.id}
        className={styles.textarea}
        value={note.content}
        onChange={handleChange}
        // autoFocus
        // onFocus={(event) => {
        //   const field = event.target as HTMLTextAreaElement;
        //   field.setSelectionRange(field.value.length, field.value.length);
        // }}
      />
    );
  }

  return <div>Error</div>;
};
