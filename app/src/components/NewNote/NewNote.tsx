import { FC, FormEvent } from "react";
import styles from "./NewNote.module.css";
import { Stack } from "../Stack/Stack";
import { useApiCreateNote } from "../../data";

export const NewNote: FC = () => {
  const createNote = useApiCreateNote();

  return (
    <div className={styles.container}>
      <Stack gap="var(--size-9)">
        <h1>
          Create note
        </h1>
        <form
          className={styles.form}
          method="post"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            const title = form.get('title') as string;

            await createNote.mutateAsync(title);
          }}
        >
          <Stack>
            <div className={styles.formField}>
              <label htmlFor="title">Title</label>
              <input
                className={styles.input}
                type="text"
                name="title"
                id="title"
                autoComplete="hidden"
                autoFocus
                required
                minLength={2}
              />
            </div>
            <button type="submit">Start note</button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
