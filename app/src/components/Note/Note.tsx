import { FC } from "react";
import styles from "./Note.module.css";
import { Header } from "../Header/Header";
import { Editor } from "../Editor/Editor";
import { Note as TNote } from "../../api";

export type NoteProps = Pick<TNote, 'content'>;

export const Note: FC<NoteProps> = ({ content }) => {
  return (
    <main className={styles.main}>
      <Header />
      <Editor content={content} />
    </main>
  )
};