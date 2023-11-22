import { FC } from "react";
import styles from "./NoteItem.module.css";
import { useEditor } from "../../hooks/useEditor";

export type NoteItemProps = {
  heading: string;
  date: Date | string;
  preTab?: React.ReactNode;
  id: number;
}

export const NoteItem: FC<NoteItemProps> = (props) => {
  const {
    heading,
    date,
    preTab,
    id,
  } = props;
  const { setActive } = useEditor();

  return (
    <button type="button" onClick={() => setActive(id)} className={styles.item}>
      <div className={styles.pretab}>{preTab}</div>
      <div className={styles.main}>
        <h2 className={styles.heading}>{heading}</h2>
        <span className={styles.info}>
          {date.toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </button>
  );
}