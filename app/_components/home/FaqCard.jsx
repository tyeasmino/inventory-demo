"use client";

import { useState, useRef, useEffect } from "react";

function FaqCard({ isInitialOpen = false, question, answer }) {
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`py-5 px-6 space-y-2 w-full cursor-pointer transition-all duration-200 border-[#FFFFFF33] rounded-[20px] z-10 ${
        isOpen
          ? " border-2  bg-[linear-gradient(92deg,_rgba(50,50,50,0.5)_0%,_rgba(30,30,30,0.5)_100%)]"
          : "border-0"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex gap-6 justify-between">
        <p className="text-xl font-extrabold">{question}</p>
        <svg
          className={`mt-1.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={12}
          viewBox="0 0 22 12"
          fill="none"
        >
          <path
            d="M1 1L11 11L21 1"
            stroke="#FD6801"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        ref={contentRef}
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 300ms ease, opacity 300ms ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pt-2">{answer}</p>
      </div>
    </div>
  );
}

export default FaqCard;
