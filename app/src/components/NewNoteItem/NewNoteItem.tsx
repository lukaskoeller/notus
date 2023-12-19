import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./NewNoteItem.module.css";

export const NewNoteItem: FC = () => {
  return (
    <Link to="/note" className={['btn', styles.button].join(' ')}>Add Note</Link>
  );
}