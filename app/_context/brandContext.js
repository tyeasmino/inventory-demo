"use client";
import { createContext, use } from "react";

const brandContext = createContext();

export const useBrand = () => use(brandContext);

export const BrandProvider = ({ value, children }) => {
  return (
    <brandContext.Provider value={value}>{children}</brandContext.Provider>
  );
};
