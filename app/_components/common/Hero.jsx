import Image from "next/image";
import React from "react";

const Hero = ({ heroImg, title = "" }) => {
  return (
    <div className="grid place-items-center relative w-full h-[513px]">
      <Image
        src={heroImg}
        alt="hero"
        fill
        className="min-h-[513px]  w-full object-cover col-start-1 row-start-1 z-0"
      />

      <div className="col-start-1 row-start-1 z-20 translate-y-20 ">
        <h1 className="text-[54px] md:text-[120px] text-center uppercase leading-none font-vantity">
          {title}
        </h1>
        <p className="mt-6 text-[#E9E9E9] text-base text-center font-bold">
          Kinggoflangisland |Danieljean56 | Dylanbriscoee Tibby.D{" "}
        </p>
        <p className=" text-[#FF9923] text-base text-center font-bold">
          +Celebrity Gust
        </p>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#140327_0%,rgba(20,3,39,0)_71.34%)] z-10" />
    </div>
  );
};

export default Hero;
