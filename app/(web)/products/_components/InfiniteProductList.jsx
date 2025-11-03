"use client";

import { useEffect, useRef, useState } from "react";
import { Loading, ProductCard } from "@/app/_components/common/Index";
import { fetchProducts } from "@/app/_actions";
import { useFilter } from "../_context/filterContext.mjs";

export default function InfiniteProductList({
  initialData,
  category,
  search,
  min,
  max,
}) {
  const [products, setProducts] = useState(initialData?.data?.results || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(!!initialData?.data?.next);
  const loaderRef = useRef(null);
  const isLoading = useRef(false);
  const { sort } = useFilter();
  console.log(sort);

  // Reset on filter change
  useEffect(() => {
    setProducts(initialData?.data?.results || []);
    setCurrentPage(1); // Reset to first page
    setHasMore(!!initialData?.data?.next);
  }, [initialData]);

  const loadMore = async () => {
    if (isLoading.current || !hasMore) return;

    isLoading.current = true;
    const nextPage = currentPage + 1;

    const data = await fetchProducts({
      page: nextPage,
      category,
      search,
      min,
      max,
    });

    if (data?.data?.results?.length > 0) {
      setProducts((prev) => [...prev, ...data.data.results]);
      setCurrentPage(nextPage);
      setHasMore(!!data.data.next);
    } else {
      setHasMore(false);
    }

    isLoading.current = false;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loaderRef.current]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {products
          ?.toSorted((a, b) => {
            if (sort === "a-z") {
              return a.name.localeCompare(b.name);
            }
            if (sort === "z-a") {
              return b.name.localeCompare(a.name);
            }
            if (sort === "h-l") {
              return b.selling_price - a.selling_price;
            }
            if (sort === "l-h") {
              return a.selling_price - b.selling_price;
            }
            return 0;
          })
          ?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="text-center py-4 text-gray-500">
          <Loading />
        </div>
      )}
    </div>
  );
}
