import { FC } from "react";
import styles from './Search.module.css';

export const Search: FC = () => {
  return (
    <input className={styles.search} type="search" name="search" id="search" placeholder="Find…" />
  );
};