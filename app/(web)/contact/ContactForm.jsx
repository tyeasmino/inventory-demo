"use client";
import { contactAction } from "@/app/_actions";
import { Button, Loading } from "@/app/_components/common/Index";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [state, action, pending] = useActionState(contactAction);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Message send!");
    }

    if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form
      action={action}
      className="rounded-[40px] bg-[#8732E3] space-y-6 md:space-y-7 p-6 md:p-10 flex-1 md:w-[524px] xl:w-auto xl:max-w-[600px] md:translate-y-[-100px] xl:translate-y-[110px] md:self-end"
    >
      <Input placeholder="Full Name" name="full_name" />
      <Input placeholder="Email" type="email" name="email" />
      <Input placeholder="Phone" type="phone" name="company_name" />
      <Textarea placeholder="Phone" name="message" />

      <Button className={"w-full mt-2.5"} type="submit" disabled={pending}>
        {pending ? <Loading /> : "Send"}
      </Button>
    </form>
  );
};

export default ContactForm;

function Input({ placeholder = "", type = "text", name = "" }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      className="bg-[#350F67B5] border-[1.5px] border-[#FFFFFF2E] px-5 md:px-7 py-3 md:py-5 block  rounded-[16px] w-full"
    />
  );
}
function Textarea({
  placeholder = "Type your message",
  type = "text",
  name = "",
}) {
  return (
    <textarea
      name={name}
      id=""
      className="bg-[#350F67B5] border-[1.5px] border-[#FFFFFF2E] px-7 py-5 block w-full  rounded-[16px]"
    ></textarea>
  );
}
