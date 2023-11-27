import { FC } from "react";
import styles from './Stack.module.css';

export type StackProps = {
  children: React.ReactNode;
  gap?: `var(--${string})`;
}

export const Stack: FC<StackProps> = (props) => {
  const {
    children,
    gap,
  } = props;

  return (
    <div className={styles.stack} style={{ gap }}>
      {children}
    </div>
  );
};
