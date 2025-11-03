"use client";
import { changePassword } from "@/app/_actions";
import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import AuthBtn from "@/app/_components/auth/Common";
import { PasswordFiled } from "@/app/_components/auth/Input";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const [state, action] = useActionState(changePassword);
  const router = useRouter();
  if (!uid || !token) {
    router.push("/check-mail");
  }
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(`Password changed!`);

      router.push("/login");
    }

    if (state?.status === "error") {
      toast.error(state?.message || "An error occurred!");
    }
  }, [state]);
  return (
    <AuthWrapper
      title={"Create New password"}
      desc={`Your new password must be different
from previous used passwords.`}
    >
      <form action={action} className="w-full">
        <div className="w-full  space-y-9">
          <input type="text" hidden defaultValue={uid} name="uid" />
          <input type="text" hidden defaultValue={token} name="token" />
          <PasswordFiled
          //    error={state?.password}
          />
          <PasswordFiled name="confirm_password" />
          <AuthBtn>Reset Password</AuthBtn>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default page;
