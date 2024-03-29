import { FC, FormEvent } from "react";
import styles from "./NewNote.module.css";
import { Stack } from "../Stack/Stack";
import { useCreateNote } from "../../data";

export const NewNote: FC = () => {
  const createNote = useCreateNote();

  return (
    <div className={styles.container}>
      <Stack gap="var(--size-9)">
        <h1 className="btn">
          Create note
        </h1>
        <form
          className={styles.form}
          method="post"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            console.log(form, e);
            
            const title = form.get('title') as string;

            createNote.mutate(title);
          }}
        >
          <Stack>
            <div className={styles.formField}>
              <label htmlFor="title">Titel</label>
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
