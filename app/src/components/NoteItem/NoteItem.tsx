import { FC, ReactNode } from "react";
import styles from "./NoteItem.module.css";
import { NavLink } from "react-router-dom";
import { Note } from "../../api";

export type NoteItemProps = Pick<Note, 'updated_at' | 'id' | 'title'> & {
  preTab?: ReactNode;
};

export const NoteItem: FC<NoteItemProps> = (props) => {
  const {
    title,
    id,
    updated_at,
    preTab,
  } = props;

  return (
    <NavLink to={`/note/${id}`} className={styles.item}>
      <div className={styles.pretab}>{preTab}</div>
      <div className={styles.main}>
        <h2 className={styles.heading}>{title}</h2>
        <span className={styles.info}>
          {updated_at}
        </span>
      </div>
    </NavLink>
  );
}