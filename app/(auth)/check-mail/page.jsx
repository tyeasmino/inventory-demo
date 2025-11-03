import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import { Button } from "@/app/_components/common/Index";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <AuthWrapper
      title={"check Your Email"}
      desc={"we have sent a reset password link to your email."}
    >
      <div className="flex flex-col gap-2 justify-center">
        <Link
          href="https://mail.google.com/"
          className="w-full block"
          target="_blank"
        >
          <Button className={"w-full"}>Go To Gmail</Button>
        </Link>

        <Link
          href={"/reset-password"}
          className="mb-2.5 mt-4 border-b border-[#7B6198]"
        >
          Try another email address
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default page;
