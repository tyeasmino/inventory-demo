"use client";
import { CartContext } from "@/app/_context/cartContext";
import React, { use } from "react";
import { SmallQuantity } from "./Quantity";

const CartList = () => {
  const { carts, onDelete } = use(CartContext);
  return (
    <>
      {carts?.map((cart) => {
        const { id, qty, product_img, name, selling_price } = cart;

        return (
          <div
            key={id}
            className="flex items-center gap-4 border-b py-2.5 border-[#4B3662]"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={product_img}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 ">
              <div className="flex justify-between gap-2">
                <h3 className="text-xs md:text-lg  w-[80%] font-extrabold md:font-medium mb-1">
                  {name}
                </h3>
                <button
                  className="text-[#ff2626] cursor-pointer"
                  onClick={() => onDelete(id)}
                >
                  <Delete />
                </button>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <span className="text-sm text-[#D5BBF2] font-medium">
                  {selling_price}
                </span>
                <SmallQuantity qty={qty} id={id} />
                <span className="text-xl font-extrabold">
                  {(Number(qty) * Number(selling_price)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartList;

function Delete() {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="26" height="24" rx="6" fill="#FF2626" fillOpacity="0.19" />
      <path
        d="M18.8333 6.8L18.3511 14.82C18.2282 16.8688 18.1668 17.8936 17.6667 18.6304C17.4198 18.9945 17.1019 19.3018 16.7333 19.5328C15.989 20 14.9911 20 12.9953 20C10.9964 20 9.997 20 9.25111 19.532C8.88236 19.3006 8.5645 18.9927 8.31778 18.628C7.81844 17.8904 7.75778 16.864 7.638 14.812L7.16667 6.8M6 6.8H20M16.1547 6.8L15.6234 5.6736C15.2711 4.9248 15.0946 4.5512 14.7904 4.3176C14.7229 4.26585 14.6514 4.21983 14.5766 4.18C14.2398 4 13.8353 4 13.0272 4C12.1981 4 11.7836 4 11.4406 4.1872C11.3647 4.22897 11.2924 4.27713 11.2243 4.3312C10.9171 4.5736 10.7452 4.9616 10.4014 5.7368L9.93011 6.8M11.0556 15.6V10.8M14.9444 15.6V10.8"
        stroke="#FF1D15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
