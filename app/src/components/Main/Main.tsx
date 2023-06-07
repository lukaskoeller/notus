import { FC } from "react";
import styles from "./Main.module.css";
import { Header } from "../Header/Header";
import { EditorProvider } from "../../contexts/editor";
import { Note } from "../Note/Note";

export const Main: FC = () => {

  return (
    <main className={styles.main}>
      <EditorProvider>
        <Header />
        <Note />
      </EditorProvider>
    </main>
  )
};