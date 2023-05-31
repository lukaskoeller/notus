import { FC } from "react";
import styles from "./Card.module.css"

export type CardProps = {
  children: React.ReactNode;
}

export const Card: FC<CardProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};
