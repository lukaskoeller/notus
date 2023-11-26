import { FC } from "react";
import { Aside } from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";

export const Root: FC = () => {
  return (
    <>
      <Aside />
      <Outlet />
    </>
  );
};
