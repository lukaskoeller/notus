import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./NoteTextArea.module.css";
import { useNote, useUpdateNote } from "../../data";
import { noteRoute } from "../../router";

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
  const { noteId } = noteRoute.useParams();
  const { data: note, isLoading, isSuccess } = useNote();
  const [text, setText] = useState(note?.content ?? "");
  const debouncedText = useDebounce(text, 2500);
  const { mutate: mutateNote } = useUpdateNote();

  useEffect(() => {
    const title = debouncedText.split("\n")?.[0]?.slice(2) ?? "";

      if (noteId && debouncedText) {
        mutateNote({
          requestBody: {
            content: debouncedText,
            title: title,
          },
          id: Number(noteId),
        });
      }
    }, [debouncedText, mutateNote, noteId]);

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
