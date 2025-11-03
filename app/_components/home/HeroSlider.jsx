"use client";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import heroImage from "@/public/images/hero-bg.png";
import Link from "next/link";

export default function HeroSlider({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(timer);
  }, [instanceRef]);

  return (
    <div className="grid text-white relative font-nexa h-screen">
      {/* Slider Images */}
      <div ref={sliderRef} className="keen-slider col-start-1 row-start-1">
        {slides?.map((src, idx) => (
          <div key={idx} className="keen-slider__slide">
            <Image
              src={src}
              alt={`Slide ${idx}`}
              width={1920}
              height={1080}
              className="h-full 2xl:h-screen w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Centered content */}
      <div className="col-start-1 row-start-1 grid place-items-center z-20">
        <div className="w-[90%] lg:w-[832px] text-center grid place-items-center gap-6 pt-18">
          <h1 className="text-[54px] md:text-[100px] xl:text-[120px] leading-none font-vantity text-white mt-10">
            Premium cannabis flower
          </h1>
          <p>
            Hand-picked buds, cultivated with passion, nurtured by nature. Grown
            with care from seed to harvest. Delivered with trust, freshness, and
            integrity — every time.
          </p>
          <Link href={"/products"}>
            <button className="p-2 pl-6 rounded-[100px] bg-[#FF9923] flex items-center gap-2 hover:gap-4 transition-all duration-300 active:scale-95 cursor-pointer text-sm font-bold">
              Shop Now{" "}
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
      </div>

      {/* Circle Pagination */}
      <div className="hidden  absolute right-[8%] top-1/2 -translate-y-1/2 z-50 xl:flex flex-col gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`relative size-6 grid place-items-center rounded-full border-[1.5px] duration-300 transition-all cursor-pointer ${
              currentSlide === idx
                ? "border-white border-r-transparent rotate-[35deg] "
                : "border-gray-300"
            }`}
          >
            <div className="size-3 bg-gray-300 rounded-full" />
          </button>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(123.06%_50%_at_50%_50%,rgba(34,28,43,0.80)_27.39%,rgba(2,30,36,0)_80.58%)] z-10"></div>

      <div
        style={{
          background:
            "linear-gradient(172deg, rgba(20, 3, 39, 0.00) 7.61%, #140327 65.08%)",
        }}
        className="absolute -bottom-20 translate-y-1/2 h-[270px] md:h-[370px] w-full z-0"
      ></div>
    </div>
  );
}
