"use client";
import { updateUserRelatedData } from "@/app/_actions";
import { Loading } from "@/app/_components/common/Index";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const DefaultBtn = ({ is_default, id }) => {
  const [state, action, pending] = useActionState(async (_, formData) => {
    return await updateUserRelatedData({
      url: `/client/addresses/${id}/`,
      body: formData,
      revalidate: "/profile",
    });
  });

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Default address updated successfully!");
    } else if (state?.status === "error") {
      toast.error(state?.message || "Failed to update default address.");
    }
  }, [state]);
  return (
    <form action={action}>
      <input type="text" hidden name="is_default" defaultValue={true} />
      {pending ? (
        <Loading />
      ) : (
        <button
          disabled={pending || is_default}
          type="submit"
          className="py-2.5 px-4 border-b border-[#4B3662] flex gap-2.5 items-center cursor-pointer"
        >
          {is_default ? (
            <>
              <svg
                width={18}
                height={14}
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 1.70492L5.5 13.7049L0 8.20492L1.41 6.79492L5.5 10.8749L16.09 0.294922L17.5 1.70492Z"
                  fill="#09D46F"
                />
              </svg>
              Default Address
            </>
          ) : (
            "Make this default address"
          )}
        </button>
      )}
    </form>
  );
};

export default DefaultBtn;
