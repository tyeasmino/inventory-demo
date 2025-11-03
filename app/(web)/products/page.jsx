import {
  Hero,
  Loading,
  Modal,
  ProductCard,
  QueryBoundary,
} from "@/app/_components/common/Index";
import React, { Suspense, use } from "react";
import Filter from "./_components/Filter";
import { FilterProvider } from "./_context/filterContext.mjs";
import { FilterText } from "./_components/Client";

import { fetchData, getSiteData } from "@/app/_fetch/fetchData";
import SortSelect from "./_components/SortSelect";
import Search from "./_components/Search";
import { fetchProducts } from "@/app/_actions";
import InfiniteProductList from "./_components/InfiniteProductList";

const ProductPage = ({ searchParams }) => {
  const { category, min, max, search } = use(searchParams);
  const data = use(getSiteData());

  return (
    <div>
      <Hero heroImg={data?.productPage} title="Shop Now" />
      <div className="my-20 px-6 flex ">
        {/* filter */}
        <FilterProvider>
          <Suspense fallback={<Loading />}>
            <FilterProduct />{" "}
          </Suspense>
          {/* Products  */}
          <Suspense fallback={<Loading />}>
            <ProductsList
              category={category}
              min={min}
              max={max}
              search={search}
            />
          </Suspense>
        </FilterProvider>
      </div>
    </div>
  );
};

export default ProductPage;

function ProductsList({ category, min, max, search }) {
  const initialData = use(
    fetchProducts({ page: 1, category, search, min, max })
  );

  const {
    data: { results: products, count, next } = {},
    status,
    message,
  } = initialData || {};

  return (
    <div className="w-full lg:ml-6">
      {/* top bar */}
      <div className="flex items-center justify-between w-full mb-10 ">
        {/* filter */}
        <FilterText />

        {/* right */}
        <div className="flex items-center justify-end lg:justify-between gap-4 md:gap-6 flex-1 relative z-0">
          {/* total items */}
          <div className="flex gap-2 items-end">
            <p className=" text-base md:text-2xl font-semibold leading-0">
              {count || 0}
            </p>
            <p className="text-xs md:text-sm  leading-0">Items Found</p>
          </div>

          {/* select */}
          <div className="flex items-center gap-4 md:gap-6">
            <Search />
            <p className="text-xs md:text-sm ">Sort By :</p>

            <SortSelect />
          </div>
        </div>
      </div>

      <QueryBoundary status={status} count={count} errorMsg={message}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div> */}
        <InfiniteProductList
          initialData={initialData}
          category={category}
          search={search}
          min={min}
          max={max}
        />
      </QueryBoundary>
    </div>
  );
}

async function FilterProduct() {
  const fetchCategories = await fetchData("/products/categorywisecount/");

  const { data: categories, status, message } = fetchCategories || {};

  return (
    <QueryBoundary
      status={status}
      errorMsg={message}
      count={categories?.length}
    >
      <Filter categories={categories} />
    </QueryBoundary>
  );
}
