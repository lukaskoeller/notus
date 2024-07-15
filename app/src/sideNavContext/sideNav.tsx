import { FC, createContext, useEffect, useMemo, useState } from "react";

type API = {
  closeSideNav: () => void;
  showSideNav: () => void;
};

type State = {
  open: boolean;
  isBackgroundInert: boolean | undefined;
};

type Context = API & State;

export const SideNavContext = createContext<Context>({} as Context);

export const SideNavProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [isMediaBelowThreshold, setIsMediaBelowThreshold] = useState<boolean>();

  const isBackgroundInert = isMediaBelowThreshold && open;

  useEffect(() => {
    const handleMatchMedia = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsMediaBelowThreshold(true);
      } else {
        setIsMediaBelowThreshold(false);
      }
    };
    
    if (isMediaBelowThreshold === undefined) {
      handleMatchMedia();
    }

    window.addEventListener("resize", handleMatchMedia);

    return () => {
      window.removeEventListener("resize", handleMatchMedia);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useMemo(() => {
    const closeSideNav = () => setOpen(false);
    const showSideNav = () => setOpen(true);

    return {
      closeSideNav,
      showSideNav,
    };
  }, []);

  return (
    <SideNavContext.Provider value={{ open, isBackgroundInert, ...api }}>
      {children}
    </SideNavContext.Provider>
  );
};
