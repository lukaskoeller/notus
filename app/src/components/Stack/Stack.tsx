import { FC } from "react";
import styles from './Stack.module.css';

export type StackProps = {
  children: React.ReactNode;
  gap?: `var(--${string})` | '0';
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export const Stack: FC<StackProps> = (props) => {
  const {
    children,
    gap,
    className,
  } = props;

  return (
    <div className={[styles.stack, className].join(' ')} style={{ gap }}>
      {children}
    </div>
  );
};
