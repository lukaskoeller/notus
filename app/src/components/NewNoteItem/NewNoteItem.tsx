import { FC } from "react";
import styles from "./NewNoteItem.module.css";
import { Link } from "@tanstack/react-router";

export const NewNoteItem: FC = () => {
  return (
    <Link to="/note" className={['btn', styles.button].join(' ')}>Add Note</Link>
  );
}