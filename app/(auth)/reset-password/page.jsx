"use client";
import { resetPassword } from "@/app/_actions";
import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import AuthBtn from "@/app/_components/auth/Common";
import { EmailFiled } from "@/app/_components/auth/Input";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [state, action] = useActionState(resetPassword);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(`Check your mail`);

      router.push("/check-mail");
    }

    if (state?.status === "error") {
      toast.error(state?.message || "An error occurred!");
    }
  }, [state]);
  return (
    <AuthWrapper
      title={"Reset Password"}
      desc={
        "Enter your login email and we’ll send you a link to reset your password."
      }
    >
      <form action={action} className="w-full space-y-8">
        <EmailFiled
          error={state?.email}
          defaultValue={state?.data}
          name={"email"}
        />
        <AuthBtn>Next</AuthBtn>
      </form>
    </AuthWrapper>
  );
};

export default page;
