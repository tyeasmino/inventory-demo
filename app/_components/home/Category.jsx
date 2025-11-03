"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { SlideArrow } from "../common/svg";
import Link from "next/link";

const Card = ({ id, name, image }) => {
  return (
    <Link
      href={`/products/?category=${id}`}
      className="keen-slider__slide grid place-items-center"
    >
      <div className="rounded-[40px] w-fit rounded-tl-none p-[2px] bg-[linear-gradient(135deg,_#ffffff_22%,_#999999_100%)]">
        <Image
          src={image}
          className="size-[150px] aspect-square rounded-[40px] rounded-tl-none"
          width={150}
          height={150}
          alt={name}
        />
      </div>
      <p className="text-2xl font-medium mt-8">{name}</p>
    </Link>
  );
};

function Category({ perView = 5, spacing = 40, categories }) {
  const sliderRef = useRef(null);
  const [sliderInstanceRef, slider] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView,
      spacing,
    },
    breakpoints: {
      "(max-width: 767px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      "(min-width: 768px) and (max-width: 1023px)": {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView,
          spacing,
        },
      },
    },
  });

  return (
    <div className="relative my-20 w-full overflow-hidden ">
      {/* Slider Content */}
      <div className="container relative">
        <div ref={sliderInstanceRef} className="keen-slider">
          {categories?.map((cat) => (
            <Card key={cat.id} name={cat.name} image={cat.img} id={cat.id} />
          ))}
        </div>
        {/* Arrow buttons for large screens (sides) */}
        <div className="hidden lg:block">
          <button
            onClick={() => slider.current?.prev()}
            className="absolute right-full top-1/2 -translate-y-1/2 z-10 p-2 rounded-full"
          >
            <SlideArrow />
          </button>

          <button
            onClick={() => slider.current?.next()}
            className="absolute left-full top-1/2 -translate-y-1/2 z-10 p-2 rounded-full"
          >
            <SlideArrow className="rotate-180" />
          </button>
        </div>
      </div>

      {/* Arrow buttons for sm/md screens (bottom center) */}
      <div className="flex lg:hidden justify-center gap-4 mt-4">
        <button
          onClick={() => slider.current?.prev()}
          className="p-2 rounded-full"
        >
          <SlideArrow />
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="p-2 rounded-full rotate-180"
        >
          <SlideArrow />
        </button>
      </div>
    </div>
  );
}

export default Category;
