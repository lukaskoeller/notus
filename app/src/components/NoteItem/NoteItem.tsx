import { FC } from "react";
import styles from "./NoteItem.module.css";

export type NoteItemProps = {
  heading: string;
  date: Date | string;
}

export const NoteItem: FC<NoteItemProps> = (props) => {
  const {
    heading,
    date,
  } = props;

  return (
    <div className={styles.item}>
      <h2 className={styles.heading}>{heading}</h2>
      <span className={styles.info}>
        {date.toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}
      </span>
    </div>
  );
}