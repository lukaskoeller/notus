import { FC } from "react";
import styles from './Aside.module.css';
import { Card } from "../Card/Card";
import { NoteItem } from "../NoteItem/NoteItem";
import { Stack } from "../Stack/Stack";
import { useSideNav } from "../../hooks/useSideNav";
import { Search } from "../Search/Search";

export const Aside: FC = () => {
  const { open, closeSideNav } = useSideNav();

  return (
    <aside className={styles.aside} data-open={open}>
      <nav className={styles.nav}>
        <Search />
        <Card style={{ '--card-padding': 0 }}>
          <Stack>
            {[
              '🟢🔵 Application inovex',
              '🍕 Pizzarezept',
              '🏋️ Trainingsplan'
            ].map((item) => {
              return (
                <NoteItem heading={item} date={new Date()} />
                );
              })}
          </Stack>
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