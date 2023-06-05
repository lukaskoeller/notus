import { FC } from "react";
import { useSideNav } from "../../hooks/useSideNav";
import { ListIcon } from "../ListIcon/ListIcon";
import styles from "./Header.module.css";
import { PreviewWriteSwitch } from "../PreviewWriteSwitch/PreviewWriteSwitch";

export const Header: FC = () => {
  const { showSideNav } = useSideNav();
  return (
    <header className={styles.header}>
        <button type="button" onClick={showSideNav}>
          <ListIcon />
        </button>
        <PreviewWriteSwitch />
    </header>
  );
};
