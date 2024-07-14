import { FC } from "react";
import styles from "./Start.module.css";
import { Stack } from "../Stack/Stack";
import { Link } from "@tanstack/react-router";

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
          <Link to="/note" className="btn">Add a new note</Link>
        </Stack>
      </Stack>
    </div>
  );
};
