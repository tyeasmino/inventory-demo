import Image from "next/image";
import heroImage from "@/public/images/hero-bg.png";
import {
  About,
  Banner,
  BestSelling,
  Category,
  Connected,
  Discount,
  FAQ,
  JoinBanner,
  Products,
} from "../_components/home";
import { fetchData, getSiteData } from "../_fetch/fetchData";
import { Suspense, use } from "react";
import HeroSlider from "../_components/home/HeroSlider";
import { Loading } from "../_components/common/Index";

// import heroImage from "../public/images/i-x.svg"

export default function Home({ searchParams }) {
  const { category } = use(searchParams);
  const data = use(getSiteData()) || {};
  const heroImages = Object?.keys(data)
    ?.filter((key) => key?.startsWith("herosection_img_"))
    ?.map((key) => data[key])
    ?.filter((value) => value);

  return (
    <>
      <HeroSlider slides={heroImages} />
      <Suspense
        fallback={
          <div className="w-full p-10 grid place-items-center">
            <Loading />
          </div>
        }
      >
        <CategoryList />
      </Suspense>
      <JoinBanner />

      <Products searchCategory={category} />
      <Suspense
        fallback={
          <div className="w-full p-10 grid place-items-center">
            <Loading />
          </div>
        }
      >
        <BestSelling />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full p-10 grid place-items-center">
            <Loading />
          </div>
        }
      >
        <Discount />
      </Suspense>
      <Banner />
      <About />
      <Suspense
        fallback={
          <div className="w-full p-10 grid place-items-center">
            <Loading />
          </div>
        }
      >
        <FAQ />
      </Suspense>
      <Connected />
    </>
  );
}

async function CategoryList(params) {
  const fetchCategories = await fetchData("/products/categories/");

  const { data: categories } = fetchCategories || {};

  return <Category categories={categories} />;
}
