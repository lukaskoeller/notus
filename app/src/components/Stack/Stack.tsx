import { FC } from "react";
import styles from './Stack.module.css';

export type StackProps = {
  children: React.ReactNode;
}

export const Stack: FC<StackProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.stack}>
      {children}
    </div>
  );
};
