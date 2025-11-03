import React, { use } from "react";
import CustomSlider from "./Slide";
import p1 from "@/public/images/p1.jpg";
import ProductCard from "../common/ProductCard";
import { fetchData } from "@/app/_fetch/fetchData";
import { QueryBoundary } from "../common/Index";

const BestSelling = () => {
  const {
    data: { results: products, count } = {},
    status,
    message,
  } = use(fetchData(`/client/top-selling-products/`, { isBranch: true })) || {};

  return (
    <section
      style={{
        background:
          "radial-gradient(385.5% 141.01% at 0.83% -0.25%, #8732E3 0%, #C415FF 100%)",
      }}
      className="py-20 "
    >
      <div className="container mb-20">
        <div>
          <h1 className="heading-1">Best Selling Product</h1>
          <p className=" text-xs sm:text-lg lg:text-2xl max-w-[800px] xl:max-w-[1200px] text-[#DCD9D9]">
            Our products are fresh and good. You can see and smell the care.
            They also feel nice to use. Whether vape, flower, or edible, we make
            sure you can trust and enjoy them.
          </p>
        </div>
      </div>

      <QueryBoundary
        count={count}
        status={status}
        errorMsg={message}
        warningMsg="No top-selling products available right now."
      >
        <CustomSlider>
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </CustomSlider>
      </QueryBoundary>
    </section>
  );
};

export default BestSelling;
