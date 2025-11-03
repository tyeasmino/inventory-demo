"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = ({ className, totalPage }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const nextDisabled = page >= totalPage;
  const prevDisabled = page <= 1;

  return (
    <div className={`w-full flex justify-between ${className}`}>
      <div className="flex gap-2 items-center"></div>
      <div className="flex gap-6 items-center">
        <p className="text-[#6E6D7A] whitespace-nowrap text-sm font-medium">
          {page} of {totalPage}
        </p>

        <div className="flex gap-7">
          <Link
            href={`?page=${Number(page) - 1}`}
            disabled={prevDisabled}
            className={
              prevDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
            }
          >
            <span>{"\u2039"}</span>
          </Link>
          <Link
            href={`?page=${Number(page) + 1}`}
            disabled={nextDisabled}
            className={
              nextDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
            }
          >
            <span>{"\u203A"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
