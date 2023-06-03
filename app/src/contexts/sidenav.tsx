import { FC, createContext, useMemo, useState } from "react";

type API = {
  closeSideNav: () => void;
  showSideNav: () => void;
}

type State = {
  open: boolean
};

type Context = API & State;

export const SideNavContext = createContext<Context>({} as Context);

export const SideNavProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const api = useMemo(() => {
    const closeSideNav = () => setOpen(false);
    const showSideNav = () => setOpen(true);

    return {
      closeSideNav,
      showSideNav,
    }
  }, []);

  return (
    <SideNavContext.Provider value={{ open, ...api }}>
      {children}
    </SideNavContext.Provider>
  )
};