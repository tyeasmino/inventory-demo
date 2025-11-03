import xIcon from "@/public/images/i-x.svg";
import fIcon from "@/public/images/i-facebook.svg";
import iIcon from "@/public/images/i-instagram.svg";
import yIcon from "@/public/images/i-youtube.svg";

import Link from "next/link";
import Logo from "../ui/Logo";
import Image from "next/image";
import {
  HamburgerIcon,
  MobileNav,
  NavCart,
  NavMenu,
  NavProfile,
  NavSearch,
} from "./nav-client";

import { NavProvider } from "@/app/_context/navContext";
import { use } from "react";
import {
  fetchData,
  getSiteData,
  userFetchClient,
} from "@/app/_fetch/fetchData";
import { QueryBoundary } from "./Index";
import { cookies } from "next/headers";

const Navbar = () => {
  const { facebook_url, youtube_url, linkedin_url, instagram_url, x_url } =
    use(getSiteData()) || {};
  return (
    <NavProvider>
      <nav className="fixed z-[200] left-1/2 -translate-x-1/2 top-4 col-start-1 mt-4 row-start-1 container bg-[#1F112D61] h-fit w-fit backdrop-blur-[200px]  py-3 rounded-[20px] bg-red-500/10">
        {/* Top nav */}
        <div className="flex justify-between px-6  border-b-[.5px] border-[#A67FD0] pb-2 mb-2">
          <p className="truncate text-sm font-semibold">
            Delivering Across Long Island!
          </p>

          <div className="hidden md:flex gap-2.5 items-center">
            <Link href={x_url}>
              <Image src={xIcon} alt="x" />
            </Link>
            <Link href={facebook_url}>
              <Image src={fIcon} alt="facebook" />
            </Link>

            <Link href={instagram_url}>
              <Image src={iIcon} alt="instagram" />
            </Link>
            <Link href={youtube_url || "https://www.youtube.com/"}>
              <Image src={yIcon} alt="youtube" />
            </Link>
          </div>
        </div>

        {/* Nav  */}
        <div className="flex justify-between items-center px-6">
          <HamburgerIcon />
          <Logo />
          <NavMenu>
            <ProductCategoryMenu />
          </NavMenu>

          <div className="flex gap-5 items-center ">
            <NavSearch />
            <div className="border  lg:block border-[#D6D6D6] h-[26px]"></div>
            <NavCart />

            {/* Profile */}
            <NavProfileFetched />
          </div>
        </div>
      </nav>
      {/* mobile nav */}
      <MobileNavData />
    </NavProvider>
  );
};

export default Navbar;

function MobileNavData() {
  const cookieStore = use(cookies());
  const data = cookieStore.get("user")?.value;

  return <MobileNav profileData={JSON.parse(data || "{}")} />;
}

function NavProfileFetched() {
  const { data } = use(userFetchClient(`/api/myDetails/`));
  return <NavProfile profileData={data} />;
}

export function ProductCategoryMenu() {
  const fetchCategories = use(fetchData("/products/categories/"));

  const { data: categories, status, message } = fetchCategories || {};
  return (
    <div className="absolute hidden group-hover:block right-0 z-[220]  w-[212px] pt-2">
      <div className="   p-1 bg-[#36224B] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.16),_0px_0px_1px_0px_rgba(0,0,0,0.40)] rounded-[12px] ">
        <QueryBoundary
          status={status}
          errorMsg={message}
          count={categories?.length}
        >
          <div className="w-full  flex flex-col h-[55vh] max-h-[550px] overflow-y-auto">
            {categories?.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/products/?category=${category.id}`}
                  className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </QueryBoundary>
      </div>
    </div>
  );
}
