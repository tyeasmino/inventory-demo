import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import AuthBtn from "@/app/_components/auth/Common";
import { PasswordFiled } from "@/app/_components/auth/Input";
import React from "react";

const page = () => {
  return (
    <AuthWrapper title={"Create New password"}>
      <p className="text-[#D5BBF2]">
        Your new password must be different from previous used passwords.
      </p>
      <PasswordFiled />
      <AuthBtn>Let’s Go</AuthBtn>
    </AuthWrapper>
  );
};

export default page;
