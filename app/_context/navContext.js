"use client";
import { createContext, use, useState } from "react";

const NavContext = createContext();

export const useNav = () => use(NavContext);

export const NavProvider = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <NavContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      {children}
    </NavContext.Provider>
  );
};
