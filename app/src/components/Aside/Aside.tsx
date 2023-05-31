import { FC } from "react";
import styles from './Aside.module.css';
import { Card } from "../Card/Card";
import { NoteItem } from "../NoteItem/NoteItem";
import { Stack } from "../Stack/Stack";

export type AsideProps = {
  children: React.ReactNode;
}

export const Aside: FC<AsideProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <aside className={styles.aside}>
      {children}
      <Card style={{ '--card-padding': 0 }}>
        <Stack>
          {Array.from(Array(7).keys()).map(() => {
            return (
              <NoteItem heading="My next vacation 2023" date={new Date()} />
              );
            })}
        </Stack>
      </Card>
    </aside>
  );
}