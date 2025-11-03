import React, { use } from "react";
import { LightOne, LightTwo } from "../common/svg";
import { fetchData } from "@/app/_fetch/fetchData";
import Link from "next/link";
import { ProductCard, QueryBoundary } from "../common/Index";

const Products = ({ searchCategory }) => {
  const fetchCategories = use(fetchData("/products/categories/"));

  const {
    data: categories = [],
    status: catStatus,
    message: catMessage,
  } = fetchCategories || {};
  const searchedCategory = searchCategory || categories[0]?.id;
  const fetchProducts = use(
    fetchData(
      `/inventory/public/available-stocks/?category=${searchedCategory}`,
      { isBranch: true }
    )
  );
  const {
    data: { results: products, count } = {},
    status: productStatus,
    message: productMessage,
  } = fetchProducts || {};

  return (
    <section className="py-10 md:py-20 xl:py-28 relative overflow-hidden">
      <LightOne className={"absolute top-0 -left-20"} />
      <LightTwo
        className={"absolute bottom-[-360px] left-1/2 -translate-x-1/2"}
      />

      <div className="container relative z-10">
        {/* Heading */}
        <div className="text-center relative">
          <h1 className="heading-1 ">Shop Our Product</h1>
          <p className="mx-auto text-xs sm:text-lg lg:text-2xl max-w-[800px] xl:max-w-[1200px] text-[#DCD9D9]">
            Our products are fresh and good. You can see and smell the care.
            They also feel nice to use. Whether vape, flower, or edible, we make
            sure you can trust and enjoy them.
          </p>
          <svg
            className="size-[60px] scale-50 2xl:size-[100px] xl:size-[200px] absolute right-0 -top-20 -translate-y-1/3 hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M100 0L113.717 48.8059L150 13.3975L137.477 62.5233L186.603 50L151.194 86.2826L200 100L151.194 113.717L186.603 150L137.477 137.477L150 186.603L113.717 151.194L100 200L86.2826 151.194L50 186.603L62.5233 137.477L13.3975 150L48.8059 113.717L0 100L48.8059 86.2826L13.3975 50L62.5233 62.5233L50 13.3975L86.2826 48.8059L100 0Z"
              fill="#8732E3"
            />
          </svg>
        </div>

        {/* tab buttons */}
        <div className="mt-10 md:mt-20 pb-3 mb-7 md:pb-6 md:mb-14 flex gap-6 items-center text-xl font-extrabold text-white border-b border-[#e2e2e2] max-w-full overflow-x-auto">
          <QueryBoundary
            count={categories?.length}
            status={catStatus}
            errorMsg={catMessage}
          >
            {categories?.map((cat) => {
              return (
                <Link
                  href={`?category=${cat.id}`}
                  scroll={false}
                  key={cat.id}
                  className={`py-3.5 px-6  cursor-pointer whitespace-nowrap hover:text-[#FF9923] hover:border-b-4 hover:border-[#FF9923] transition-all duration-300 ${
                    searchedCategory == cat.id &&
                    "text-[#FF9923] border-b-4 border-[#FF9923]"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </QueryBoundary>
        </div>

        {/* product card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <QueryBoundary
            count={count}
            status={productStatus}
            errorMsg={productMessage}
          >
            {products?.slice(0, 6)?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </QueryBoundary>
        </div>
      </div>
    </section>
  );
};

export default Products;

// function ProductCard() {
//   return (
//     <div className=" lg:w-[calc(50%-20px)] xl:w-[calc(33.333%-26.66px)]">
//       <Image
//         src={p1}
//         alt="product"
//         style={{
//           boxShadow:
//             "0px 33px 9px 0px rgba(234, 46, 194, 0.00), 0px 21px 9px 0px rgba(234, 46, 194, 0.02), 0px 12px 7px 0px rgba(234, 46, 194, 0.08), 0px 5px 5px 0px rgba(234, 46, 194, 0.13), 0px 1px 3px 0px rgba(234, 46, 194, 0.15)",
//         }}
//         className="w-full aspect-square object-cover rounded-[20px]"
//       />

//       <p className="text-lg font-bold mt-5">Frozen Lemonade 1/2</p>
//       <p className="text-xl font-extrabold">20 $</p>
//     </div>
//   );
// }
