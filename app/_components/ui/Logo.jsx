import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.svg";
import Link from "next/link";
const Logo = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(38.4%_49.09%_at_50.56%_50.91%,_#C7A1EF_0%,_#6C5089_100%)] blur-[25px] rounded-full "></div>
      <Link href={"/"}>
        <Image src={logo} className="relative z-10" alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
