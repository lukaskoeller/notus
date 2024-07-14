import { FC } from "react";
import { useSideNav } from "../../hooks/useSideNav";
import { ListIcon } from "../ListIcon/ListIcon";
import styles from "./Header.module.css";
import { PreviewWriteSwitch } from "../PreviewWriteSwitch/PreviewWriteSwitch";
import { NewNoteItem } from "../NewNoteItem/NewNoteItem";

export const Header: FC = () => {
  const { showSideNav, isBackgroundInert } = useSideNav();
  return (
    <header
      className={styles.header}
      {...{ inert: isBackgroundInert ? '' : undefined }}
    >
      <button type="button" className={styles.menuBtn} onClick={showSideNav}>
        <ListIcon />
      </button>
      <NewNoteItem />
      <button type="button">Save</button>
      <PreviewWriteSwitch />
    </header>
  );
};
