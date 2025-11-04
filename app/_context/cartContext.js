"use client";

import { toast } from "react-toastify";

const { createContext, useState } = require("react");

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  const onClear = () => setCarts([]);

  const onCartAdd = (product, value) => {
    const hasInCart = carts.find((p) => p.id === product.id);
    if (hasInCart) {
      toast.info("Product already in cart, change quantity from cart");
      return;
    }
    if (product.current_stock <= 0) {
      toast.error("Product is out of stock");
      return;
    } else {
      toast.success("Item successfully added");
      setCarts((prev) => [...prev, { ...product, qty: value || 1 }]);
    }
  };

  const onIncrement = (id) => {
    const newCarts = carts.map((product) => {
      if (product.id === id) {
        if (Number(product.current_stock) === Number(product.qty)) {
          toast.error("Product is out of stock");
          return product;
        } else if (Number(product.current_stock) <= Number(product.qty)) {
          toast.error(
            `Please enter a value within the available stock — only ${product.current_stock} left..`
          );
          return product;
        } else {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }
      } else {
        return product;
      }
    });

    setCarts(newCarts);
  };
  const onBulkChangeQty = (id, value) => {
    const newCarts = carts.map((product) => {
      if (product.id === id) {
        if (Number(product.current_stock) === value) {
          toast.error("Product is out of stock");
          return product;
        } else if (Number(product.current_stock) < value) {
          toast.error(
            `Please enter a value within the available stock — only ${product.current_stock} left..`
          );
          return product;
        } else {
          if (value < 1) {
            return {
              ...product,
              qty: 1,
            };
          }
        }
        return {
          ...product,
          qty: Number(value),
          //   };
        };
      } else {
        return product;
      }
    });

    setCarts(newCarts);
  };
  const onDecrement = (id) => {
    const newCarts = carts.map((product) => {
      if (product.id === id) {
        if (product.qty <= 1) {
          return {
            ...product,
            qty: 1,
          };
        } else {
          return {
            ...product,
            qty: product.qty - 1,
          };
        }
      } else {
        return product;
      }
    });

    setCarts(newCarts);
  };

  const onDelete = (id) => {
    toast.success("Item deleted!");
    setCarts((prev) => prev.filter((c) => c.id !== id));
  };

  const totalPrice = carts
    .reduce(
      (sum, cart) => (sum += parseFloat(cart.selling_price) * cart.qty),
      0
    )
    ?.toFixed(2);

  return (
    <CartContext.Provider
      value={{
        carts,
        onClear,
        onCartAdd,
        onIncrement,
        onDecrement,
        onDelete,
        onBulkChangeQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
