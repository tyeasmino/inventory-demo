import Image from "next/image";
import React from "react";
import joinBanner from "@/public/images/join-b.svg";
import Link from "next/link";

const JoinBanner = () => {
  return (
    <section className="py-10">
      <div
        style={{
          background:
            "linear-gradient(111deg, rgba(135, 50, 227, 0.2) 41.17%, rgba(255, 21, 185, 0.2) 100.77%)",
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)", // for Safari support
        }}
        className="w-[80%] max-[1400px] mx-auto p-10 lg:p-20 rounded-2xl relative"
      >
        <div className="flex justify-between items-center flex-col lg:flex-row gap-10 lg:gap-20 relative z-10">
          <div className="space-y-10">
            <p className="text-[45px] font-semibold leading-none">
              Get Wave of <br />
              <span className="bg-[linear-gradient(92deg,#8732E3_4.65%,#FF15B9_64.64%)] bg-clip-text text-transparent">
                Rewards
              </span>
            </p>

            <p>
              Tell a friend about Zalerance, and win big when they <br />{" "}
              mention you on their first order!
            </p>
            <Link
              href={"/products"}
              className="py-2 border-b-[2px] w-fit border-white text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:gap-4 cursor-pointer "
            >
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
            </Link>
          </div>
          <div>
            {/* <div className="p-1.5 rounded-[40px] bg-[#8732E3] shadow-[0_0_60px_0_rgba(255,21,185,0.5)]">
              <Image src={joinBanner} alt="banner" className="rounded-[40px]" />
            </div> */}

            <Image
              src={joinBanner}
              alt="banner"
              className="rounded-[40px] border-[6px] border-[#8732E3] shadow-[0_0_60px_0_rgba(255,21,185,0.5)]"
            />
          </div>
        </div>

        <svg
          className="absolute top-[18%] left-10 blur-[130px]"
          width={388}
          height={454}
          viewBox="0 0 388 454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M189.978 52.247C212.145 76.079 195.298 129.621 223.557 144.635C251.083 159.26 280.405 111.499 310.857 116.472C341.195 121.426 375.143 140.645 385.649 171.105C395.735 200.349 370.756 230.25 360.109 259.271C350.644 285.07 351.096 324.247 326.248 333.021C294.213 344.333 263.355 302.522 229.682 305.327C211.424 306.848 203.232 331.025 189.978 344.371C153.664 380.937 132.144 463.056 82.8452 453.183C40.8097 444.764 86.8884 361.185 69.0004 320.143C56.7455 292.026 5.00837 294.528 0.37418 263.964C-4.40498 232.445 37.9848 214.112 48.3784 184.138C57.1144 158.943 49.2561 131.022 55.4902 105.012C64.0393 69.3433 59.1367 15.7957 91.7981 2.98129C126.194 -10.5138 164.265 24.6035 189.978 52.247Z"
            fill="url(#paint0_linear_7_568)"
            fillOpacity="0.8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_7_568"
              x1={194}
              y1="112.535"
              x2={194}
              y2={454}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8732E3" />
              <stop offset={1} stopColor="#FF15B9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default JoinBanner;
