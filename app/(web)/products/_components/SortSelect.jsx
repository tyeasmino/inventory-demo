"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFilter } from "../_context/filterContext.mjs";

const SortSelect = () => {
  const { sort, setSort } = useFilter();

  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border px-3 py-1.5 rounded-sm min-w-[127px]"
    >
      <option value="select" className="bg-[#2F1D43] hidden">
        Select
      </option>
      <option value="a-z" className="bg-[#2F1D43]">
        A to Z
      </option>
      <option value="z-a" className="bg-[#2F1D43]">
        Z to A
      </option>
      <option value="h-l" className="bg-[#2F1D43]">
        High to Low
      </option>
      <option value="l-h" className="bg-[#2F1D43]">
        Low to High
      </option>
    </select>
  );
};

export default SortSelect;
