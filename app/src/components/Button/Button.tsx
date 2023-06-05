import { FC } from "react";

export type ButtonProps = {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <button type="button">
      {children}
    </button>
  );
};
