import React from "react";

const Button = ({
  outline = false,
  type = "button",
  children,
  size = "",
  bg = "bg-[#FF9923]",
  className,
  ...props
}) => {
  let sizeClass = "px-8 py-5 text-xl font-extrabold";

  switch (size) {
    case "sm":
      sizeClass = "px-4 py-2.5 text-sm font-bold";
      break;

    default:
      break;
  }

  return (
    <button
      className={`${sizeClass}  font-nexa rounded-[100px] cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 ${
        !outline ? bg ?? "bg-[#FF9923]" : "border-2"
      } ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
