"use client";
import { CartContext } from "@/app/_context/cartContext";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { Button } from "./Index";
import { toast } from "react-toastify";

const Quantity = ({ price, product }) => {
  const { onCartAdd } = use(CartContext);
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const handleQty = (e) => {
    const value = e.target.value;
    if (value < 1) {
      setQty(1);
    } else {
      setQty(value);
    }
  };

  const handleIncrement = () => setQty(Number(qty) + 1);
  const handleDecrement = () => {
    if (qty < 2) {
      return;
    } else {
      setQty(Number(qty) - 1);
    }
  };

  const handleBuy = () => {
    onCartAdd(product, qty);
    router.push("/checkout");
  };
  return (
    <>
      <div className="flex gap-3  items-center mt-10">
        <p className="text-sm font-medium">Quantity:</p>

        <div className="flex items-center gap-3 ">
          <div className="bg-[#331D4A] border-2 border-[#8732E3] rounded-[12px] p-2 flex items-center gap-2.5">
            <button
              onClick={handleDecrement}
              className="size-[25px] md:size-[50px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
            >
              -
            </button>
            <input
              type="number"
              value={qty}
              onChange={handleQty}
              className="w-[20px] w-[32px] text-xs ms:text-lg border-none bg-transparent focus:outline-0 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              onClick={handleIncrement}
              className="size-[25px] md:size-[50px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
            >
              +
            </button>
          </div>
          <p className="text-xl md:text-2xl leading-none underline">
            {(Number(price) * Number(qty)).toFixed(2)}$
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <Button size="sm" onClick={() => onCartAdd(product, qty)}>
          Add Card
        </Button>
        <Button outline size="sm" onClick={handleBuy}>
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default Quantity;

export function SmallQuantity({ qty, id }) {
  const { onIncrement, onDecrement, onBulkChangeQty } = use(CartContext);
  return (
    <div className="flex items-center bg-[#4b3662] rounded-xl px-1 md:px-3 py-1 text-white text-lg font-medium">
      <button
        onClick={() => onDecrement(id)}
        className=" size-[26px] md:size-[32px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
      >
        -
      </button>
      <input
        type="number"
        value={qty}
        onChange={(e) => onBulkChangeQty(id, e.target.value)}
        className="w-[24px] md:w-[26px] text-xs  md:text-sm border-none bg-transparent focus:outline-0 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={() => onIncrement(id)}
        className="size-[26px] md:size-[32px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export const QuantityWithAction = ({ price, product }) => {
  const [qty, setQty] = useState(1);
  const handleQty = (e) => {
    const value = e.target.value;
    if (value < 1) {
      setQty(1);
    } else {
      setQty(value);
    }
  };

  const handleIncrement = () => setQty(Number(qty) + 1);
  const handleDecrement = () => {
    if (qty < 2) {
      return;
    } else {
      setQty(Number(qty) - 1);
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="bg-[#331D4A] border-2 border-[#8732E3] rounded-[12px] p-2 flex items-center gap-2.5">
        <button
          onClick={handleDecrement}
          className="size-[50px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
        >
          -
        </button>
        <input
          type="number"
          value={qty}
          onChange={handleQty}
          className="w-[32px] border-none bg-transparent focus:outline-0 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={handleIncrement}
          className="size-[50px] rounded-lg bg-[#4B3662] grid place-items-center text-xl font-extrabold cursor-pointer"
        >
          +
        </button>
      </div>
      <p className="text-2xl leading-none underline">
        {(Number(price) * Number(qty)).toFixed(2)}$
      </p>
    </div>
  );
};
