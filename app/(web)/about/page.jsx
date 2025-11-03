import { Hero } from "@/app/_components/common/Index";
import React, { use } from "react";
import heroImg from "@/public/images/about-bg.svg";
import coverImg from "@/public/images/cover.webp";
import missionImg from "@/public/images/mission.webp";
import testImg from "@/public/images/test-bg-about.webp";
import badgeImg from "@/public/images/about-gurantee-badge.webp";
import Image from "next/image";
import { LightOne, LightThree } from "@/app/_components/common/svg";
import { getSiteData } from "@/app/_fetch/fetchData";
import Link from "next/link";

const AboutPage = () => {
  const data = use(getSiteData());
  return (
    <div>
      <Hero heroImg={data?.aboutUs} title="About Us" />

      <div className="max-w-screen overflow-hidden">
        <div className="pb-20 container ">
          <h1 className="heading-1 text-[#FCCE00]">Behind The Smoke</h1>
          <h1 className="heading-1">Who We Are</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 relative">
            <LightOne className={"absolute -left-40 -top-40 z-0"} />
            <div className="space-y-3 text-[#EEE1FD] text-xs sm:text-base text-justify basis-1/2 relative z-10">
              <p>
                At Zalence, we believe in the power of peace, pleasure, and
                purpose. Born from a desire to bring balance and bliss into
                everyday life, our curated collection of premium flowers, vapes,
                wax, pre-rolls, and edibles is crafted to elevate your
                experience—whether you’re seeking calm, creativity, or
                connection.
              </p>

              <p>
                We source only the finest products, prioritizing quality,
                purity, and potency, so every session delivers on what matters
                most to you. From the soothing effects of our signature Gaza
                flowers to the flavorful punch of our edibles, Zalence is your
                go-to destination for premium lifestyle choices.
              </p>

              <p>
                Rooted in community and inspired by culture, Zalence isn't just
                a brand—it’s a movement. We're here to help you find your
                balance, embrace the moment, and live life on your terms.
              </p>

              <div>
                <p>Welcome to the world of High Zalence.</p>
                <p>Peace of mind. Power in your vibe.</p>
              </div>
            </div>
            <Image
              src={coverImg}
              alt="banner"
              className="rounded-[40px] border-[6px] border-[#8732E3] shadow-[0_0_60px_0_rgba(255,21,185,0.5)] relative z-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 place-items-center mt-20 relative ">
            <LightThree className={"absolute -right-36 top-[-550px] z-0"} />
            <div className="relative z-20">
              <Image
                src={badgeImg}
                alt="badge"
                className="absolute top-10 left-0 -translate-x-1/2 scale-90 xl:scale-100"
              />
              <Image src={missionImg} alt="mission" className="" />
            </div>

            <div className="relative z-10">
              <h1 className="heading-1">Our Mission</h1>
              <p>
                Zalerance is your trusted place for easy and judgment-free
                cannabis shopping. Everyone is welcome to explore, learn, and
                buy from our wide range of high-quality products. Whether you're
                new or experienced with cannabis, we're here to help you feel
                confident and supported every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="grid place-items-center">
        <Image
          src={testImg}
          alt="test bg"
          className="col-start-1 row-start-1 w-full object-cover h-[624px] lg:h-[724px]"
        />

        <div className="col-start-1 row-start-1 text-center container w-fit grid place-items-center gap-4">
          <h1 className="heading-1">Find Your Taste</h1>
          <p className="max-w-[881px]">
            we carefully craft every product from start to finish, using only
            the finest ingredients and trusted methods. Our goal is to deliver
            natural, authentic flavor without compromise, and maintain the
            highest standards of quality in every step. It’s our promise of
            honesty, purity, and excellence in every bite or sip.
          </p>
          <Link href={"/products"}>
            <button className="p-2 pl-6 rounded-[100px] bg-[#FF9923] flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer text-sm font-bold">
              Browse Products{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={41}
                height={40}
                viewBox="0 0 41 40"
                fill="none"
              >
                <rect x="0.5" width={40} height={40} rx={20} fill="white" />
                <path
                  d="M27.5711 12.9291L27.854 26.7884M13.429 27.0713L27.5711 12.9291L13.429 27.0713ZM27.5711 12.9291L13.7118 12.6463L27.5711 12.9291Z"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
