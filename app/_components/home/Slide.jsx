"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef } from "react";
import { SlideArrow } from "../common/svg";

export default function CustomSlider({
  children,
  perView = 3.4,
  spacing = 40,
  smPerView = 1,
  mdPerView = 1.5,
}) {
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
          perView: smPerView,
          spacing: 16,
        },
      },
      "(min-width: 768px) and (max-width: 1023px)": {
        slides: {
          perView: mdPerView,
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
    <div className="relative w-full overflow-hidden ">
      {/* Slider Content */}
      <div className="container relative">
        <div ref={sliderInstanceRef} className="keen-slider">
          {children}
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
