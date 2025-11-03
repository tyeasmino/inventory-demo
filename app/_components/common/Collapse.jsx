"use client";

import { useState, useRef, useEffect } from "react";

// export function Collapse({
//   title,
//   children,
//   defaultOpen = false,
//   icon = true,
//   isDisabled = false,
//   className,
// }) {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   const contentRef = useRef(null);
//   const [maxHeight, setMaxHeight] = useState("0px");

//   useEffect(() => {
//     if (contentRef.current) {
//       if (isOpen) {
//         setMaxHeight(`${contentRef.current.scrollHeight}px`);
//       } else {
//         setMaxHeight("0px");
//       }
//     }
//   }, [isOpen]);

//   return (
//     <div>
//       <button
//         disabled={isDisabled}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex justify-between items-center w-full disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${className}`}
//       >
//         {title}

//         {icon && (
//           <svg
//             className={`transform transition-transform duration-300 ${
//               isOpen ? "rotate-90" : ""
//             }`}
//             xmlns="http://www.w3.org/2000/svg"
//             width={6}
//             height={10}
//             viewBox="0 0 6 10"
//             fill="none"
//           >
//             <path
//               d="M1 9L5 5L1 1"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         )}
//       </button>

//       <div
//         ref={contentRef}
//         style={{ maxHeight }}
//         className={`transition-all duration-300 ease-in-out overflow-hidden px-4 ${
//           isOpen ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

export function Collapse({
  title,
  children,
  defaultOpen = false,
  icon = true,
  isDisabled = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isOpen]);

  return (
    <details
      open={isOpen}
      className={`group `}
      onClick={(e) => {
        if (isDisabled) e.preventDefault();
      }}
    >
      <summary
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          if (!isDisabled) setIsOpen(!isOpen);
        }}
        className={`flex justify-between items-center w-full disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed list-none ${className}`}
      >
        {title}

        {icon && (
          <svg
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={10}
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M1 9L5 5L1 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </summary>

      <div
        ref={contentRef}
        style={{ maxHeight }}
        className={`transition-all duration-300 ease-in-out overflow-hidden px-4 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </details>
  );
}
