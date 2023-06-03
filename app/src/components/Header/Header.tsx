import { FC } from "react";
import { useSideNav } from "../../hooks/useSideNav";

export const Header: FC = () => {
  const { showSideNav } = useSideNav();
  return (
    <header>
        <button type="button" onClick={showSideNav}>Open Menu</button>
    </header>
  );
};
