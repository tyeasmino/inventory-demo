import Image from "next/image";
import React, { use } from "react";
import limitedOfferImg from "@/public/images/limited-offer.svg";
import CustomSlider from "./Slide";
import ProductCard from "../common/ProductCard";
import p1 from "@/public/images/p1.jpg";
import { LightOne } from "../common/svg";
import { fetchData } from "@/app/_fetch/fetchData";
import { QueryBoundary } from "../common/Index";

const Discount = () => {
  const {
    data: { results: products, count } = {},
    status,
    message,
  } = use(
    fetchData(`/inventory/public/available-stocks/?discounted=true`, {
      isBranch: true,
    })
  ) || {};
  return (
    <section className="py-20 relative">
      <LightOne className={"absolute top-0 left-1/2 translate-x-1/2"} />
      <div className="container mb-20 relative">
        <div className="flex justify-end relative z-10">
          <Image
            src={limitedOfferImg}
            alt="Limited offer"
            className="absolute left-0 top-0 w-[80px] lg:w-[200px] hidden md:block"
          />
          <div>
            <h1 className="heading-1 leading-none max-w-[1150px] text-right">
              Buy One Get One <br /> With Discount
            </h1>
            <p className="text-right text-[#DCD9D9] text-sm md:text-base lg:text-2xl">
              Grab your favorite products at unbeatable prices. Limited stock,
              limited time!
            </p>
          </div>
        </div>
      </div>
      <QueryBoundary
        count={count}
        status={status}
        errorMsg={message}
        warningMsg="No discount products available right now."
      >
        <CustomSlider>
          {products?.map((product) => {
            return <ProductCard key={products.id} product={product} />;
          })}
        </CustomSlider>
      </QueryBoundary>
    </section>
  );
};

export default Discount;
