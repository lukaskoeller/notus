import { useContext } from "react";
import { SideNavContext } from "./sideNav";

export const useSideNav = () => useContext(SideNavContext);