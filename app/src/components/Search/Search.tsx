import { FC } from "react";
import { Card } from "../Card/Card";
import styles from './Search.module.css';

export const Search: FC = () => {
  return (
    <Card>
      <input className={styles.search} type="search" name="search" id="search" placeholder="Find…" />
    </Card>
  );
};