"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

const ProductImage = ({ website_images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(website_images[0]);
  const [slideDirection, setSlideDirection] = useState("");
  const imageIndexRef = useRef(0);

  const handleImageChange = (newImage, newIndex) => {
    // Prevent re-clicking the same image
    if (newImage === selectedImage) {
      return;
    }

    const currentIndex = imageIndexRef.current;

    // Determine the slide direction based on the current and new index
    const direction = newIndex > currentIndex ? "left" : "right";

    // Set a temporary "reset" state to trigger the animation again
    setSlideDirection("");

    setTimeout(() => {
      setSlideDirection(direction);
      setSelectedImage(newImage);
      imageIndexRef.current = newIndex;
    }, 10); // A small delay is needed to force the re-render and re-apply the animation className
  };

  return (
    <div className="grid place-items-stretch gap-6 xl:gap-10 min-h-full min-w-full">
      <div className="xl:col-start-2 relative overflow-hidden">
        <Image
          src={selectedImage}
          width={680}
          height={680}
          alt="product"
          style={{
            maxInlineSize: "100%",
          }}
          className={`rounded-[40px] aspect-square xl:aspect-auto w-full h-full max-h-[680px] object-cover 
            transition-transform duration-500 ease-in-out
            ${
              slideDirection === "left"
                ? "animate-slide-left"
                : slideDirection === "right"
                ? "animate-slide-right"
                : ""
            }`}
        />
      </div>

      <div className="xl:mt-[90px] flex xl:flex-col gap-[25px] lg:gap-[50px] min-w-[50px] xl:min-w-[100px] xl:col-start-1 xl:row-start-1">
        {website_images?.map((image, i) => {
          return (
            <Image
              key={i}
              src={image}
              width={50}
              height={50}
              alt="product"
              className={`min-size-[50px] xl:size-[100px] aspect-square object-cover rounded-[10px] xl:rounded-[20px] cursor-pointer ${
                selectedImage === image ? "opacity-100" : "opacity-50"
              }  hover:opacity-100 `}
              onClick={() => handleImageChange(image, i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductImage;
