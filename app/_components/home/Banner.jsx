import Image from "next/image";
import React from "react";
import banner from "@/public/images/banner.png";

const Banner = () => {
  return (
    <section className="grid place-items-center">
      <Image
        src={banner}
        className="col-start-1 row-start-1 h-[679px] lg:h-[855px] w-full object-cover"
        alt="banner"
      />
      <h1 className=" container col-start-1 row-start-1 heading-1 text-center max-w-[1254px]">
        Elevate Every Hit Flower, Wax & Vapes, All Fire
      </h1>
    </section>
  );
};

export default Banner;
