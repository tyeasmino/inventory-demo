"use client";
import { guestAuth } from "@/app/_actions";
import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import AuthBtn from "@/app/_components/auth/Common";
import { PasswordFiled } from "@/app/_components/auth/Input";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [state, action] = useActionState(guestAuth);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state?.message);
    }
    if (state?.status === "success") {
      toast.success("Guest authentication success!");
      router.push("/");
    }
  }, [state]);
  return (
    <AuthWrapper title={"Guest Password"}>
      <form action={action} className="space-y-6">
        <PasswordFiled error={state?.guest_password} name="guest_password" />
        <input type="text" hidden name="guest_id" defaultValue={""} />

        <AuthBtn>Let’s Go</AuthBtn>
      </form>
    </AuthWrapper>
  );
};

export default page;
