"use client";
import { debounce } from "@/app/_utils/debouns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const route = useRouter();

  const debouncedSearch = useCallback(
    debounce((value) => route.push(`?search=${value}`), 1000),
    []
  );

  const handleSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };
  return (
    <div className="hidden md:block relative">
      <svg
        className="absolute top-1/2 -translate-y-1/2 left-3"
        width={19}
        height={18}
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3828 17L13.5161 13.1333M15.605 8.11111C15.605 12.0385 12.4213 15.2222 8.49392 15.2222C4.56657 15.2222 1.38281 12.0385 1.38281 8.11111C1.38281 4.18375 4.56657 1 8.49392 1C12.4213 1 15.605 4.18375 15.605 8.11111Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-transparent border-0 border-b focus:outline-0 py-2 pl-10"
      />
    </div>
  );
};

export default Search;
