"use client";
import React, { useMemo, useState } from "react";
import DOMPurify from "dompurify";

const Description = ({ description, limit = 1000 }) => {
  if (!description) return null;
  const [expanded, setIsOpen] = useState(false);

  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(description);
  }, [description]);

  const shouldTruncate = sanitizedHtml.length > limit;
  console.log("### should ###");
  console.log(shouldTruncate);
  const htmlToRender =
    expanded || !shouldTruncate
      ? sanitizedHtml
      : sanitizedHtml.slice(0, limit) + "...";

  return (
    <div className="mt-5 relative">
      <div
        className="custom-list"
        dangerouslySetInnerHTML={{ __html: htmlToRender }}
      />

      {shouldTruncate && (
        <>
          <div
            className={`${
              expanded ? "opacity-0" : "opacity-100"
            } transition-all duration-300 absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(30,17,44,0)_34.83%,#1E112C_81.65%)]`}
          ></div>
          <svg
            onClick={() => setIsOpen(!expanded)}
            className={`${
              expanded ? "rotate-180 -bottom-10" : "bottom-2"
            } transition-all duration-300 absolute  left-1/2 -translate-x-1/2 z-20 cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={30}
            viewBox="0 0 60 30"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width={59}
              height={29}
              rx="14.5"
              stroke="#766884"
            />
            <path
              d="M26 13L30 17L34 13"
              stroke="#857398"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default Description;
