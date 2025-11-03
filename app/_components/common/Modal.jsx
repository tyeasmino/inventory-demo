"use client";
import React from "react";
import { ModalLight } from "./svg";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { createPortal } from "react-dom";

const Modal = ({ className, onClose, children }) => {
  // const ref = useOutsideClick(() => onClose());
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-[3px] z-[340]"
      ></div>
      <div
        // ref={ref}
        //       style={{
        //         boxShadow: `57px 264px 76px 0 rgba(0, 0, 0, 0.00),
        // 37px 169px 69px 0 rgba(0, 0, 0, 0.04),
        // 21px 95px 58px 0 rgba(0, 0, 0, 0.13),
        // 9px 42px 43px 0 rgba(0, 0, 0, 0.21),
        // 2px 11px 24px 0 rgba(0, 0, 0, 0.25);`,
        //       }}
        className={`fixed top-1/2 left-1/2 -translate-1/2     rounded-[40px] bg-[#4B3662] z-[350] min-w-1/3 max-h-min overflow-hidden ${className}`}
      >
        {/* <ModalLight className={"relative left-0 top-1/2 -translate-y-1/2"} /> */}
        <div className=" relative  z-[350] p-10 overflow-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
