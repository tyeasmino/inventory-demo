"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Loading } from "../common/Index";

const AuthBtn = ({ children, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={
        "w-full rounded-[12px] bg-[#FF9923] font-extrabold py-3 cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
      }
      {...props}
    >
      {pending ? <Loading /> : children}
    </button>
  );
};

export default AuthBtn;
