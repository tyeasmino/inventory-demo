"use client";
import Link from "next/link";
import AuthWrapper from "./AuthWrapper";
import { EmailFiled, PasswordFiled } from "./Input";
import SocialAuth from "./SocialAuth";
import AuthBtn from "./Common";
import { useActionState, useEffect } from "react";
import { login, register } from "@/app/_actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AuthForm = ({ isRegister = false }) => {
  const [state, action] = useActionState(isRegister ? register : login);
  const router = useRouter();
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(`${isRegister ? "Registered" : "Logged In"} Successfully!`);

      if (isRegister) {
        router.push("/login");
      } else {
        router.push("/profile");
      }
    }

    if (state?.status === "error") {
      toast.error(state?.message || "An error occurred!");
    }
  }, [state]);
  return (
    <AuthWrapper title={`${isRegister ? "Register" : "Sign Up"} Here`}>
      <p className="text-2xl font-bold mb-10 -mt-6 bg-[linear-gradient(91deg,_#8732E3_16.16%,_#FF15B9_96.93%)] bg-clip-text text-transparent">
        Get Premium Product
      </p>

      <SocialAuth />

      <form action={action} className="w-full">
        <div className="w-full  space-y-9">
          <EmailFiled
            error={state?.email}
            defaultValue={state?.data}
            name={isRegister ? "email" : "username"}
          />
          <PasswordFiled error={state?.password} />
          {isRegister && (
            <PasswordFiled
              name="confirm_password"
              error={state?.confirm_password}
            />
          )}
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex gap-3 items-center">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <Link href={"/reset-password"}>Forgot Password?</Link>
          </div>
        </div>

        <AuthBtn>{isRegister ? "Register" : "Sign Up"}</AuthBtn>
      </form>

      <p>
        {isRegister && "Don’t"} have an account?{" "}
        <Link
          href={!isRegister ? "/register" : "/login"}
          className="text-[#FF9923]"
        >
          {isRegister ? "Sign Up" : "Register!"}
        </Link>
      </p>
    </AuthWrapper>
  );
};

export default AuthForm;
