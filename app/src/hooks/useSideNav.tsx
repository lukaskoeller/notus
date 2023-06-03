import { useContext } from "react";
import { SideNavContext } from "../contexts/sidenav";

export const useSideNav = () => useContext(SideNavContext);