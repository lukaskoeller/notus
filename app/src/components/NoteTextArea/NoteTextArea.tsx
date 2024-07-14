import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { useApiReadNote } from "../../data";
import { useUpdateNote } from "../../hooks/useUpdateNote";

/**
 * Changes were applied
 * @license https://github.com/Chalarangelo/30-seconds-of-code/blob/master/LICENSE
 * @see https://www.30secondsofcode.org/react/s/use-debounce/
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export const NoteTextArea: FC = () => {
  const { data: note, isLoading, isSuccess } = useApiReadNote();
  const [text, setText] = useState(note?.content ?? "");
  const debouncedText = useDebounce(text, 2500);
  const updateNote = useUpdateNote();

  useEffect(() => {
    updateNote(debouncedText);
  }, [debouncedText, updateNote]);

  if (isLoading) return <h2>Loading…</h2>;

  if (isSuccess) {
    if (!text && note.content) {
      setText(note.content);
    }

    const handleChange = (e: ChangeEvent) => {
      const value = (e.target as HTMLTextAreaElement).value;
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
