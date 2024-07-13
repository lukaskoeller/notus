import { FC } from "react";
import styles from "./Note.module.css";
import { Header } from "../Header/Header";
import { Editor } from "../Editor/Editor";

export const Note: FC = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Header />
        <Editor />
      </main>
    </div>
  );
};
