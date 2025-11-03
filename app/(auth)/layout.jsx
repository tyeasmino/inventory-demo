import React from "react";
import bg from "@/public/images/auth-bg.webp";
import Image from "next/image";
import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div className=" w-full min-h-screen max-h-fit  grid place-items-center ">
      <Link
        href={"/products"}
        className="text-4xl font-medium text-white rotate-45 fixed right-3 top-2 md:right-6 md:top-5 z-30"
      >
        +
      </Link>
      <Image
        src={bg}
        alt="background"
        className="col-start-1 row-start-1 w-full h-full  object-cover"
      />
      <div className="w-full h-full col-start-1 row-start-1 bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(20,3,39,0)_41.58%,_rgba(20,3,39,0.9)_100%)]"></div>
      <div className="col-start-1 row-start-1 size-fit my-10 lg:my-20">
        {children}
      </div>
    </div>
  );
};

export default layout;
