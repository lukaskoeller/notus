import { FC, Suspense } from "react";
import styles from './Aside.module.css';
import { Card } from "../Card/Card";
import { NoteItem } from "../NoteItem/NoteItem";
import { Stack } from "../Stack/Stack";
import { useSideNav } from "../../hooks/useSideNav";
import { Search } from "../Search/Search";
import { useQuery } from "@tanstack/react-query";
import { DefaultService } from "../../api";

export const Aside: FC = () => {
  const { open, closeSideNav } = useSideNav();
  const { data: notes } = useQuery({ queryKey: ['notes'], queryFn: async () => await DefaultService.getNotesNotesGet() });

  return (
    <aside className={styles.aside} data-open={open}>
      <nav className={styles.nav}>
        <Search />
        <Card style={{ '--card-padding': 0 }}>
          <Suspense fallback="Loading…">
            <Stack>
              {(notes ?? [])?.map(({ id, title, updated_at }) => {
                return (
                  <NoteItem key={id} heading={title} date={new Date(updated_at).toLocaleDateString()} />
                  );
                })}
            </Stack>
          </Suspense>
        </Card>
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