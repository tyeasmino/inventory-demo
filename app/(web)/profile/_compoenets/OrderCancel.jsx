"use client";
import { updateUserRelatedData } from "@/app/_actions";
import { Button, Loading } from "@/app/_components/common/Index";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const OrderCancel = ({ status, id }) => {
  const [state, action, pending] = useActionState(
    async (_, formData) =>
      await updateUserRelatedData({
        url: `/orders/orders/${id}/`,
        body: formData,
        revalidate: `/profile/order`,
      })
  );

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(`status updated`);
    }
    if (state?.status === "error") {
      toast.error(state?.message || "There was an error!");
    }
  }, [state]);
  return (
    <form action={action} className="mt-4">
      <input
        type="text"
        hidden
        name="order_tracking_status"
        defaultValue={"cancelled"}
      />
      <Button
        type="submit"
        disabled={status === "out_for_delivery" || pending}
        bg="bg-red-500"
        size="sm"
        className={
          "text-white mt-4 w-full disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        }
      >
        {pending ? <Loading /> : "Order Cancel"}
      </Button>
    </form>
  );
};

export default OrderCancel;
