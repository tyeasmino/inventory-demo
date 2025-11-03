"use client";

import { createContext, use, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => use(FilterContext);

export const FilterProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const [sort, setSort] = useState("");

  return (
    <FilterContext.Provider value={{ isOpen, onClose, onOpen, sort, setSort }}>
      {children}
    </FilterContext.Provider>
  );
};
