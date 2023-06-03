import { HTMLAttributes, FC } from "react";
import styles from "./Card.module.css"

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}

export const Card: FC<CardProps> = (props) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <div className={styles.card} {...rest}>
      {children}
    </div>
  );
};
