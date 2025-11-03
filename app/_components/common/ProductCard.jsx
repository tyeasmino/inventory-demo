"use client";
import Image from "next/image";
import React from "react";

import { Actions } from "./ProductCardClient";
import Link from "next/link";
import { Modal, Quantity } from "./Index";

const ProductCard = ({ product, width = 362, height = 315 }) => {
  const {
    id,
    product_img,
    product_name = "",
    name,
    selling_price,
    discount_price,
    discount_percentage,
    is_buyOneGetOne,
    branch_discount_percentage,
    branch_discount_price,
    website_images = [],
  } = product || {};

  // price and discount related calculation
  let discountPrice = null;
  let discountPercentage = null;
  if (!is_buyOneGetOne) {
    if (branch_discount_percentage) {
      discountPrice = Number(branch_discount_price);
      discountPercentage = branch_discount_percentage;
    } else if (discount_percentage) {
      discountPrice = Number(discount_price);
      discountPercentage = discount_percentage;
    }
  }
  const price = is_buyOneGetOne
    ? Number(selling_price)
    : discountPrice
    ? discountPrice
    : Number(selling_price);

  // console.log("website_images[0]", website_images, website_images[0]);
  let Discount;
  if (is_buyOneGetOne) {
    Discount = (
      <span className="px-[18px] py-2 bg-[#09A45A] rounded-[32px]  text-sm font-extrabold">
        Buy 1 Get 1
      </span>
    );
  } else if (discountPercentage) {
    Discount = (
      <span className="px-[18px] py-2 bg-[#FE2CBF] rounded-[32px]  text-sm font-extrabold">
        {discountPercentage}% OFF
      </span>
    );
  }
  return (
    <>
      <Link href={`/products/${id}`}>
        <div className="keen-slider__slide w-full ">
          <div className="relative hover:border-2 rounded-[20px] border-[#807C84] duration-300 transition-all group">
            <div className="m-2">
              <div className="flex gap-2 items-center absolute top-6 left-6">
                {Discount}
              </div>

              <Image
                src={website_images[0] || product_img}
                alt="product"
                style={{
                  boxShadow:
                    "0px 33px 9px 0px rgba(234, 46, 194, 0.00), 0px 21px 9px 0px rgba(234, 46, 194, 0.02), 0px 12px 7px 0px rgba(234, 46, 194, 0.08), 0px 5px 5px 0px rgba(234, 46, 194, 0.13), 0px 1px 3px 0px rgba(234, 46, 194, 0.15)",
                }}
                width={width}
                height={height}
                className="w-full aspect-square object-cover rounded-[20px]"
              />

              <div>
                <p className="text-base font-bold mt-5  line-clamp-2">
                  {product_name || name || "Lorem ipsum"}
                </p>
                <div className="flex gap-2.5 items-center">
                  <p className="text-xl font-extrabold">{price}$</p>
                  {discountPrice && (
                    <p className="text-base font-extrabold line-through">
                      ({selling_price}$)
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-0  bg-black/40 backdrop-blur-[2px] hidden rounded-[20px]  group-hover:grid place-items-center">
              <Actions product={product} price={price} />
            </div>
          </div>
        </div>
      </Link>
      {/* <div className="hidden">
        <Modal
          className={`scale-50 md:scale-65 lg:scale-100 lg-w-[1000px] 2xl:block`}
        >
          <div className="grid lg:grid-cols-2 gap-6 border">
            <Image
              src={product_img}
              alt="product"
              style={{
                boxShadow:
                  "0px 33px 9px 0px rgba(234, 46, 194, 0.00), 0px 21px 9px 0px rgba(234, 46, 194, 0.02), 0px 12px 7px 0px rgba(234, 46, 194, 0.08), 0px 5px 5px 0px rgba(234, 46, 194, 0.13), 0px 1px 3px 0px rgba(234, 46, 194, 0.15)",
              }}
              width={width}
              height={height}
              className="w-full aspect-square object-cover rounded-[20px]"
            />

            
            <div className="z-10 scale-65  2xl:scale-90 border">
              

              <div className="flex gap-4 ">
                <p className="py-2.5 px-[18px] rounded-[32px] bg-[#FE2CBFD4] text-sm font-nexa font-extrabold max-w-fit">
                  30 % OFF
                </p>
                <p className="py-2.5 px-[18px] rounded-[32px] bg-[#09A45A] text-sm font-nexa font-extrabold max-w-fit">
                  IN STOCK
                </p>
              </div>

              <h1 className="text-[45px] font-bold capitalize  leading-none line-clamp-2 mt-1">
                {product_name}
              </h1>

             
              <div className="mt-4 flex justify-between ">
                <p className="text-[48px] text-[#FF9923] font-[999]">
                  {selling_price}$
                </p>
                {discount_price && (
                  <span className="text-2xl line-through">
                    {discount_price}
                  </span>
                )}
              </div>

              
              <Quantity price={selling_price} product={product} />
            </div>
          </div>
        </Modal>
      </div> */}
    </>
  );
};

export default ProductCard;
