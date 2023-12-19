import { FC } from "react";
import styles from './Aside.module.css';
import { NoteItem } from "../NoteItem/NoteItem";
import { Stack } from "../Stack/Stack";
import { useSideNav } from "../../hooks/useSideNav";
import { Search } from "../Search/Search";
import { useNotes } from "../../data";
import { NewNoteItem } from "../NewNoteItem/NewNoteItem";

export const Aside: FC = () => {
  const { open, closeSideNav } = useSideNav();
  const { data: notes, isLoading } = useNotes();

  return (
    <aside className={styles.aside} data-open={open}>
      <nav className={styles.nav}>
        <Search />
        <div>
          {isLoading ? (
            <span>Loading…</span>
          ) : (
            <Stack gap="0">
              <NewNoteItem key="new" />
              {(notes ?? [])?.map(({ id, updated_at, title }) => {
                return id ? (
                  <NoteItem key={id} id={id} title={title} updated_at={new Date(updated_at ?? '').toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })} />
                  ) : null;
              })}
            </Stack>
          )}
        </div>
      </nav>
      <button
        className={styles.closeBtn}
        type="button"
        onClick={closeSideNav}
        aria-label="Close"
        title="Close Menu"
      />
    </aside>
  );
}