import { FC } from "react";
import styles from "./Main.module.css";
import { Header } from "../Header/Header";
import { Note } from "../Note/Note";

export const Main: FC = () => {

  return (
    <main className={styles.main}>
      <Header />
      <Note />
    </main>
  )
};