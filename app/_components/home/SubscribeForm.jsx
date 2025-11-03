"use client";
import { postSimpleData } from "@/app/_actions";
import React, { useActionState, useEffect } from "react";
import { Loading } from "../common/Index";
import { toast } from "react-toastify";

const SubscribeForm = () => {
  const [state, action, pending] = useActionState(async (_, formData) => {
    return postSimpleData({ url: `/client/subscribe/`, body: formData });
  });

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Subscribe success");
    }
    if (toast?.state === "error") {
      toast.error(state?.message || "There was an error");
    }
  }, [state]);
  return (
    <form action={action} className="flex w-full lg:w-[500px]">
      <input
        className="p-6 rounded-l-[10px] w-full border border-r-0 border-[#5406A7] bg-white text-base text-[#86938D] focus:outline-0"
        type="text"
        name="email"
        placeholder="Enter your mail"
      />
      <button
        disabled={pending}
        className="p-6 px-8 rounded-r-[10px] bg-[#8732E3] text-base font-bold"
      >
        {pending ? <Loading /> : "Submit"}
      </button>
    </form>
  );
};

export default SubscribeForm;
