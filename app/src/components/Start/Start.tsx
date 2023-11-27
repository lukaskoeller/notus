import { FC } from "react";
import styles from "./Start.module.css";
import { Stack } from "../Stack/Stack";

export const Start: FC = () => {
  return (
    <div className={styles.container}>
      <Stack gap="var(--size-9)">
        <div>
          <h1>notus</h1>
          <h2 className={styles.subtitle}>A simple markdown based note-taking app</h2>
        </div>
        <Stack>
          <h3>Let's get started</h3>
          <button type="button">Add a new note</button>
        </Stack>
      </Stack>
    </div>
  );
};
