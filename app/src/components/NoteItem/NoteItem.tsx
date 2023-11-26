import { FC } from "react";
import styles from "./NoteItem.module.css";
import { Link } from "react-router-dom";

export type NoteItemProps = {
  heading: string;
  date: Date | string;
  preTab?: React.ReactNode;
}

export const NoteItem: FC<NoteItemProps> = (props) => {
  const {
    heading,
    date,
    preTab,
  } = props;

  return (
    <Link to={`/note/${heading}`} className={styles.item}>
      <div className={styles.pretab}>{preTab}</div>
      <div className={styles.main}>
        <h2 className={styles.heading}>{heading}</h2>
        <span className={styles.info}>
          {date.toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </Link>
  );
}