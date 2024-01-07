import { FC } from "react";
import { Aside } from "../components/Aside/Aside";
import { Outlet } from "@tanstack/react-router";

export const Root: FC = () => {
  return (
    <>
      <Aside />
      <Outlet />
    </>
  );
};
