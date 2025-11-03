"use client";
import CartList from "@/app/_components/common/CartList";
import { CartContext } from "@/app/_context/cartContext";
import { use } from "react";
import RewardsProgresses from "../../profile/_compoenets/RewardsProgresses";

export function Billing({ rewards }) {
  const { carts, totalPrice } = use(CartContext);
  // Placeholder for item prices (can be dynamic in a real app)
  const deliveryCharge =
    carts?.length === 0 ? 0 : parseFloat(totalPrice) < 100 ? 20 : 0;
  const finalAmount = (parseFloat(totalPrice) + deliveryCharge).toFixed(2);

  const subTotal = 50;
  const delivery = 35; // Example fixed delivery
  const totalPay = subTotal + delivery; // Simple calculation
  const promoCode = "afsasfdasd";

  return (
    <div className="bg-[#36224b] rounded-[20px] text-white h-fit p-6 border lg:w-[500px] max-w-[500px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold mb-4">
          Order Item • {carts?.length || 0}
        </h1>
        <div className="h-px bg-white/30"></div>
      </div>

      {/* Order Items */}
      <div className="space-y-6 mb-8">
        {/* Item 1 */}
        <div>
          <CartList />
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="flex-1 bg-[#4b3662] border border-[#70548e] text-white placeholder:text-white/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#ac83d8]"
        />
        <button className="bg-[#70548e] hover:bg-[#70548e]/80 text-white px-6 py-2 rounded-xl">
          Apply
        </button>
        <span className="text-xl font-medium self-center">0.0 $</span>
      </div>

      {/* Order Summary */}
      <div className="bg-[#4b3662] rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Sub-Total</span>
          <span className="text-xl font-medium">{totalPrice}$</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Delivery</span>
          <span className="text-xl font-medium">{deliveryCharge}$</span>
        </div>
        <div className="border-t border-dashed border-white/30 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">Total Pay</span>
            <span className="text-3xl font-bold">{finalAmount}$</span>
          </div>
        </div>
      </div>

      {/* Reward Points */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Reward Point</h2>
        <div className="h-px bg-white/30 mb-6"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff15b9] to-[#8732e3] flex items-center justify-center">
            <span className="text-lg font-bold">★</span>
          </div>
          <div>
            <h3 className="text-lg font-medium">
              Your Point : {rewards?.points}
            </h3>
            <p className="text-white/70 text-sm">
              Earn 100 points when you place this order.
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <RewardsProgresses small rewards={rewards?.rewards} />
      </div>
    </div>
  );
}
