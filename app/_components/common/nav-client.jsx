"use client";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import profile from "@/public/images/i-profile.svg";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import cart from "@/public/images/i-cart.svg";
import emptyCart from "@/public/images/empty-cart.svg";
import { createContext, use, useEffect, useState } from "react";
import { Button } from "./Index";
import { CartContext } from "@/app/_context/cartContext";
import CartList from "./CartList";
import { useNav } from "@/app/_context/navContext";
import { Collapse } from "./Collapse";
import xIcon from "@/public/images/i-x.svg";
import fIcon from "@/public/images/i-facebook.svg";
import iIcon from "@/public/images/i-instagram.svg";
import yIcon from "@/public/images/i-youtube.svg";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/_actions";
import search from "@/public/images/i-search.svg";

export const NavProfile = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const router = useRouter();
  const handleClick = (route) => {
    router.push(route);
    setIsOpen(false);
  };
  const name = profileData?.first_name + " " + profileData?.last_name;
  return (
    <div ref={ref} className="relative ">
      <Image
        src={profile}
        alt="profile"
        className=" hidden lg:block cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute hidden lg:block  z-[9999] right-0 w-[340px] p-1 bg-[#36224B] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.16),_0px_0px_1px_0px_rgba(0,0,0,0.40)] rounded-[12px] mt-2">
          {profileData ? (
            <>
              <div className="flex gap-3 items-center p-3">
                <Image src={profile} alt="search" />
                <div>
                  <p className="text-sm font-extrabold">{name}</p>
                  <p className="text-xs text-[#D5BBF2]">
                    {profileData?.email || profileData?.username}{" "}
                  </p>
                </div>
              </div>

              <div className="w-full  flex flex-col">
                <button
                  onClick={() => handleClick("/profile")}
                  className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold text-left cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleClick("/profile/order")}
                  className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold text-left cursor-pointer"
                >
                  My Order
                </button>
                <button
                  onClick={() => handleClick("/profile/rewards")}
                  className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold text-left cursor-pointer"
                >
                  Rewards
                </button>

                <button
                  onClick={async () => {
                    await logout();
                    setIsOpen(false);
                  }}
                  className="p-3 min-w-full bg-[#4B3662] rounded-[8px] text-sm font-semibold border-none text-red-400 cursor-pointer active:scale-95 duration-300 transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="p-2.5 flex">
              <Link
                href={"/login"}
                className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ProductsMenu = ({ children }) => {
  const pathName = usePathname();
  const isActive = pathName.startsWith("/products");
  return (
    <div className="relative group">
      <Link
        // onClick={() => setIsOpen(!isOpen)}
        href={"/products"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive && "text-[#FF15B9]"
        } font-medium transition-all duration-300 cursor-pointer`}
      >
        Products
      </Link>
      {children}
    </div>
  );
};

export const NavCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { carts, totalPrice } = use(CartContext);
  const router = useRouter();

  const goToOrder = () => {
    router.push("/checkout");
    setIsOpen(false);
  };

  const ref = useOutsideClick(() => setIsOpen(false));
  return (
    <div ref={ref} className="relative ">
      <div
        className=" relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute right-0 top-0 size-[22px] rounded-full bg-[#FF9923] text-center text-[11px] leading-normal grid place-items-center ">
          <span>{carts?.length || 0}</span>
        </div>
        <Image src={cart} alt="search" />
      </div>

      {isOpen && (
        <div className="absolute   z-[9999] -right-16 min-h-[80vh] max-h-[80vh] overflow-y-auto md:right-0 md:w-[500px] p-1 bg-[#36224B] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.16),_0px_0px_1px_0px_rgba(0,0,0,0.40)] rounded-[12px] mt-2 flex  flex-col">
          {/* close and title */}
          <div className="flex justify-between items-center pb-1 border-b-2 border-[#513074] p-4">
            <svg
              onClick={() => setIsOpen(false)}
              className=" cursor-pointer"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 12L12 28M20 20L28 28M12 12L16 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-[26px] font-extrabold">Total Item</p>
            <div></div>
          </div>
          {carts?.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="my-10 flex flex-col gap-6 justify-between min-h-full flex-1  px-3">
              <div>
                <CartList />
              </div>

              <div className="flex items-center justify-center w-full flex-col gap-2">
                <div className="pt-4 my-6 border-t border-[#4B3662] flex justify-between gap-2">
                  <div>
                    <p className="text-xl font-extrabold uppercase">
                      Subtotal{" "}
                    </p>
                    <p className="text-xs text-[#C7A1EF]">
                      Taxes and shipping are calculated at checkout.
                    </p>
                  </div>
                  <p className="text-2xl font-extrabold uppercase">
                    {totalPrice}$
                  </p>
                </div>

                <Button onClick={goToOrder} className={"w-full rounded-[6px]"}>
                  Order Now
                </Button>

                <div className="grid place-content-center w-full  mb-10">
                  <div className="flex gap-2.5 items-center">
                    <p className="text-[#BB89F0] ">Welcome to </p> <CartLogo />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function CartLogo() {
  return (
    <svg
      width={141}
      height={62}
      viewBox="0 0 141 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g filter="url(#filter0_f_9_4716)">
        <ellipse
          cx="56.8623"
          cy={31}
          rx={36}
          ry={11}
          fill="url(#paint0_radial_9_4716)"
        />
      </g>
      <rect
        x="20.8623"
        y={24}
        width="73.4694"
        height={30}
        fill="url(#pattern0_9_4716)"
      />
      <defs>
        <filter
          id="filter0_f_9_4716"
          x="0.862305"
          y={0}
          width={112}
          height={62}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation={10}
            result="effect1_foregroundBlur_9_4716"
          />
        </filter>
        <pattern
          id="pattern0_9_4716"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image0_9_4716"
            transform="scale(0.00833333 0.0204082)"
          />
        </pattern>
        <radialGradient
          id="paint0_radial_9_4716"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(57.2668 31.2) rotate(92.1449) scale(10.8076 27.6265)"
        >
          <stop stopColor="#C7A1EF" />
          <stop offset={1} stopColor="#6C5089" />
        </radialGradient>
        <image
          id="image0_9_4716"
          width={120}
          height={49}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

function EmptyCart() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Image src={emptyCart} alt="empty cart" className="mt-20 mb-10" />
        <p className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#8732E3] to-[#FF15B9] bg-clip-text text-transparent">
          Your Bag is Empty
        </p>
        <p className="text-[#BB89F0] mb-10">Let's fill it up!</p>
        <Link href={"/products"} className="min-w-full">
          <Button className={"w-full"}>ORDER NOW</Button>
        </Link>

        <div className="flex items-center gap-2.5 mb-10">
          <p className="text-[#BB89F0] ">Welcome to </p> <CartLogo />
        </div>
      </div>
    </div>
  );
}

export function NavMenu({ children }) {
  const pathName = usePathname();
  const isActive = (path) => path === pathName;
  return (
    <div className="hidden lg:flex items-center">
      <Link
        href={"/"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive("/") && "text-[#ff15b9]"
        } font-medium transition-all duration-300`}
      >
        Home
      </Link>
      <ProductsMenu>{children}</ProductsMenu>
      <Link
        href={"/whole-sale"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive("/whole-sale") && "text-[#ff15b9]"
        } font-medium transition-all duration-300`}
      >
        Whole-Sale
      </Link>
      {/* <Link
        href={"/offer"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive("/offer") && "text-[#ff15b9]"
        } font-medium transition-all duration-300`}
      >
        Offer
      </Link> */}
      <Link
        href={"/about"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive("/about") && "text-[#ff15b9]"
        } font-medium transition-all duration-300`}
      >
        About
      </Link>
      <Link
        href={"/contact"}
        className={`px-[15px] py-2 hover:text-[#FF15B9] ${
          isActive("/contact") && "text-[#ff15b9]"
        } font-medium transition-all duration-300`}
      >
        Contact
      </Link>
    </div>
  );
}

export function HamburgerIcon() {
  const { setIsMobileOpen } = useNav();
  return (
    <svg
      className="lg:hidden cursor-pointer"
      onClick={() => setIsMobileOpen(true)}
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7.5C3 7.23478 3.10536 6.98043 3.29289 6.79289C3.48043 6.60536 3.73478 6.5 4 6.5H20C20.2652 6.5 20.5196 6.60536 20.7071 6.79289C20.8946 6.98043 21 7.23478 21 7.5C21 7.76522 20.8946 8.01957 20.7071 8.20711C20.5196 8.39464 20.2652 8.5 20 8.5H4C3.73478 8.5 3.48043 8.39464 3.29289 8.20711C3.10536 8.01957 3 7.76522 3 7.5ZM3 12.5C3 12.2348 3.10536 11.9804 3.29289 11.7929C3.48043 11.6054 3.73478 11.5 4 11.5H20C20.2652 11.5 20.5196 11.6054 20.7071 11.7929C20.8946 11.9804 21 12.2348 21 12.5C21 12.7652 20.8946 13.0196 20.7071 13.2071C20.5196 13.3946 20.2652 13.5 20 13.5H4C3.73478 13.5 3.48043 13.3946 3.29289 13.2071C3.10536 13.0196 3 12.7652 3 12.5ZM3 17.5C3 17.2348 3.10536 16.9804 3.29289 16.7929C3.48043 16.6054 3.73478 16.5 4 16.5H20C20.2652 16.5 20.5196 16.6054 20.7071 16.7929C20.8946 16.9804 21 17.2348 21 17.5C21 17.7652 20.8946 18.0196 20.7071 18.2071C20.5196 18.3946 20.2652 18.5 20 18.5H4C3.73478 18.5 3.48043 18.3946 3.29289 18.2071C3.10536 18.0196 3 17.7652 3 17.5Z"
        fill="white"
      />
    </svg>
  );
}

export function MobileNav({ profileData }) {
  const { isMobileOpen, setIsMobileOpen } = useNav();
  const ref = useOutsideClick(() => setIsMobileOpen(false));
  const pathName = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathName]);

  return (
    <div
      ref={ref}
      className={` fixed top-0 left-0 ${
        !isMobileOpen ? "left-[-664px]" : "left-0"
      } transition-all duration-300 lg:hidden max-h-screen overflow-auto w-[354px] bg-[#36224B] pt-11 px-2 z-[999999] shadow-[709px_0px_199px_0px_rgba(20,3,39,0.01),454px_0px_182px_0px_rgba(20,3,39,0.10),255px_0px_153px_0px_rgba(20,3,39,0.35),113px_0px_113px_0px_rgba(20,3,39,0.60),28px_0px_62px_0px_rgba(20,3,39,0.69)]`}
    >
      <svg
        onClick={() => setIsMobileOpen(false)}
        className="ml-auto cursor-pointer"
        width={50}
        height={50}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.9427 17.4718C17.2325 17.1821 17.6256 17.0193 18.0354 17.0193C18.4452 17.0193 18.8382 17.1821 19.128 17.4718L24.9899 23.3337L30.8518 17.4718C30.9944 17.3242 31.1649 17.2065 31.3535 17.1255C31.542 17.0445 31.7448 17.0018 31.95 17.0001C32.1552 16.9983 32.3587 17.0374 32.5486 17.1151C32.7386 17.1928 32.9111 17.3075 33.0562 17.4527C33.2013 17.5978 33.3161 17.7703 33.3938 17.9602C33.4715 18.1502 33.5106 18.3537 33.5088 18.5589C33.5071 18.7641 33.4644 18.9669 33.3834 19.1554C33.3024 19.344 33.1847 19.5145 33.0371 19.6571L27.1752 25.519L33.0371 31.3809C33.3186 31.6724 33.4744 32.0628 33.4709 32.468C33.4673 32.8732 33.3048 33.2608 33.0183 33.5473C32.7317 33.8339 32.3441 33.9964 31.9389 33.9999C31.5337 34.0035 31.1433 33.8477 30.8518 33.5662L24.9899 27.7043L19.128 33.5662C18.8365 33.8477 18.4461 34.0035 18.0409 33.9999C17.6357 33.9964 17.2481 33.8339 16.9615 33.5473C16.675 33.2608 16.5125 32.8732 16.509 32.468C16.5054 32.0628 16.6612 31.6724 16.9427 31.3809L22.8046 25.519L16.9427 19.6571C16.653 19.3673 16.4902 18.9742 16.4902 18.5644C16.4902 18.1546 16.653 17.7616 16.9427 17.4718Z"
          fill="#D5BBF2"
        />
      </svg>

      {/* Profile */}

      <Collapse
        title={
          <div className="p-3 flex gap-3 items-center ">
            <Image src={profile} alt="search" />
            <div>
              <p className="text-sm font-extrabold  text-left">
                {profileData?.name}
              </p>
              <p className="text-xs text-[#D5BBF2]">
                {profileData?.email || profileData?.username}
              </p>
            </div>
          </div>
        }
      >
        {profileData?.username ? (
          <div className="w-full p-1 bg-[#36224B] shadow-[0px_8px_24px_-6px_rgba(0,0,0,0.16),_0px_0px_1px_0px_rgba(0,0,0,0.40)] rounded-[12px] mt-2">
            <div className="w-full  flex flex-col">
              <Link
                href={"/profile"}
                className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
              >
                Profile
              </Link>
              <Link
                href={"/profile/order"}
                className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
              >
                My Order
              </Link>
              <Link
                href={"/profile/rewards"}
                className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
              >
                Rewards
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex">
            <Link
              href={"/login"}
              className="p-3 min-w-full hover:bg-[#4B3662] rounded-[8px] text-sm font-semibold"
            >
              Login
            </Link>
          </div>
        )}
      </Collapse>

      {/* Nav links */}
      <div className="flex flex-col mt-4">
        <Link
          href={"/"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          Home
        </Link>
        <Link
          href={"/products"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          Product
        </Link>
        <Link
          href={"/whole-sale"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          Whole-Sale
        </Link>
        <Link
          href={"/offer"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          Offer
        </Link>
        <Link
          href={"/about"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          About
        </Link>
        <Link
          href={"/contact"}
          className="py-3 px-4 text-sm font-bold hover:translate-x-2 transition-all duration-300"
        >
          Contact
        </Link>
      </div>

      {/* Social */}
      <div className="grid place-items-center my-10">
        <div className="flex gap-2.5 items-center">
          <Image src={xIcon} alt="x" />
          <Image src={fIcon} alt="facebook" />
          <Image src={iIcon} alt="instagram" />
          <Image src={yIcon} alt="youtube" />
        </div>

        <div className="mt-10 mx-4 p-10 rounded-[24px] bg-[linear-gradient(111deg,_rgba(135,50,227,0.5)_16.58%,_rgba(255,21,185,0.5)_96.46%)] space-y-2.5">
          <p className="text-2xl font-extrabold">Get Rewards</p>
          <p className="text-sm text-[#D5BBF2]">
            Tell a friend about Zalerance, and win big when they mention you on
            their first order!
          </p>
          <button className="py-2 border-b-[2px] border-white text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:gap-4 cursor-pointer ">
            Let’s GO{" "}
            <svg
              width={19}
              height={14}
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2592 5.89907L11.2837 1.90638C11.1759 1.80559 11.0896 1.68404 11.0296 1.549C10.9697 1.41395 10.9375 1.26817 10.9349 1.12035C10.9323 0.972525 10.9594 0.825693 11.0145 0.688609C11.0697 0.551524 11.1517 0.426995 11.2558 0.322453C11.3599 0.217911 11.4839 0.135496 11.6204 0.0801249C11.7569 0.0247545 11.9031 -0.00243759 12.0503 0.000170708C12.1975 0.00277901 12.3426 0.0351334 12.4771 0.0953054C12.6116 0.155478 12.7326 0.242233 12.833 0.350398L18.6794 6.22201C18.8847 6.42844 19 6.70825 19 7C19 7.29175 18.8847 7.57156 18.6794 7.77799L12.833 13.6496C12.7326 13.7578 12.6116 13.8445 12.4771 13.9047C12.3426 13.9649 12.1975 13.9972 12.0503 13.9998C11.9031 14.0024 11.7569 13.9752 11.6204 13.9199C11.4839 13.8645 11.3599 13.7821 11.2558 13.6775C11.1517 13.573 11.0697 13.4485 11.0145 13.3114C10.9594 13.1743 10.9323 13.0275 10.9349 12.8797C10.9375 12.7318 10.9697 12.586 11.0296 12.451C11.0896 12.316 11.1759 12.1944 11.2837 12.0936L15.2592 8.10093H1.09621C0.805477 8.10093 0.526651 7.98494 0.321072 7.77847C0.115493 7.57201 0 7.29198 0 7C0 6.70802 0.115493 6.42799 0.321072 6.22153C0.526651 6.01506 0.805477 5.89907 1.09621 5.89907L15.2592 5.89907Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 px-4 text-sm font-bold border-t border-[#4B3662]"
      >
        Logout
      </button>
    </div>
  );
}

export function NavSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const pathName = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);
  return (
    <div className="relative z-20">
      <Image
        src={search}
        alt="search"
        className=" cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Form
          ref={ref}
          action="/products"
          className="w-[300px] absolute right-1/2 translate-x-1/2 md:translate-x-0  md:right-0 top-full bg-[#140327] p-2 rounded-[100px] flex items-stretch"
        >
          <input
            name="search"
            className="w-full border bg-transparent z-50 rounded-full px-2"
          />
          <Button size="sm" type="submit">
            Search
          </Button>
        </Form>
      )}
    </div>
  );
}
