import React from "react";
import { LightOne, LightPink } from "../common/svg";
import img from "@/public/images/about.webp";
import Image from "next/image";
import Link from "next/link";
const About = () => {
  return (
    <section className="pt-[179px] relative ">
      <LightOne className="absolute -left-6 top-0 z-0" />
      <LightPink className="absolute right-0 top-0 z-0" />

      <div className="container relative z-10">
        <h2 className="text-[32px] md:text-[54px] xl:text-[120px] font-extrabold">
          About Zalerance
        </h2>
        <div className="flex flex-col xl:flex-row gap-12 justify-between ">
          <div className="space-y-3 text-[#EEE1FD] text-xs sm:text-base text-justify basis-1/2">
            <p>
              At Zalence, we believe in the power of peace, pleasure, and
              purpose. Born from a desire to bring balance and bliss into
              everyday life, our curated collection of premium flowers, vapes,
              wax, pre-rolls, and edibles is crafted to elevate your
              experience—whether you’re seeking calm, creativity, or connection.
            </p>

            <p>
              We source only the finest products, prioritizing quality, purity,
              and potency, so every session delivers on what matters most to
              you. From the soothing effects of our signature Gaza flowers to
              the flavorful punch of our edibles, Zalence is your go-to
              destination for premium lifestyle choices.
            </p>

            <p>
              Rooted in community and inspired by culture, Zalence isn't just a
              brand—it’s a movement. We're here to help you find your balance,
              embrace the moment, and live life on your terms.
            </p>

            <div>
              <p>
                Welcome to the world of{" "}
                <Link href={"/"} className="italic underline text-[#EA8D21]">
                  High Zalence.
                </Link>
              </p>
              <p className="font-extrabold">
                Peace of mind. Power in your vibe.
              </p>
            </div>
          </div>
          <div className="basis-1/2  grid place-content-center">
            <Image className="" src={img} alt="about" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
