import { FC } from "react";
import styles from './Aside.module.css';
import { Card } from "../Card/Card";
import { NoteItem } from "../NoteItem/NoteItem";
import { Stack } from "../Stack/Stack";
import { useSideNav } from "../../hooks/useSideNav";
import { Search } from "../Search/Search";
import { useNotes } from "../../data";

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
              {(notes ?? [])?.map(({ id, title, updated_at }) => {
                return id ? (
                  <NoteItem key={id} heading={title} date={updated_at ? new Date(updated_at).toLocaleDateString() : new Date()} />
                  ) : null;
                })}
            </Stack>
          )}
        </div>
        <Card>
          Tags
        </Card>
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