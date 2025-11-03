"use client";

import { use } from "react";
import { Button } from "./Index";
import { CartContext } from "@/app/_context/cartContext";
import { useRouter } from "next/navigation";

export const Actions = ({ product, price }) => {
  const { onCartAdd } = use(CartContext);
  const router = useRouter();

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCartAdd({ ...product, selling_price: price });
  };
  const toBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCartAdd(product);
    router.push("/checkout");
  };
  return (
    <div className="flex flex-col gap-2">
      <Button type="button" size="sm" onClick={addToCart}>
        Add Card
      </Button>
      <Button
        type="button"
        size="sm"
        bg="bg-transparent"
        onClick={toBuy}
        className={"border-2 border-white"}
      >
        Buy Now
      </Button>
    </div>
  );
};
