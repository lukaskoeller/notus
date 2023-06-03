import { FC } from "react";
import styles from "./Main.module.css";
import { MarkDoc } from "../MarkDoc/MarkDoc";
import { Header } from "../Header/Header";

const doc = `
# Hello world.
> My first Markdoc page
`;

export const Main: FC = () => {

  return (
    <main className={styles.main}>
      <div className={styles.item}>
        <Header />
        <MarkDoc markdown={doc} />
      </div>
    </main>
  )
};