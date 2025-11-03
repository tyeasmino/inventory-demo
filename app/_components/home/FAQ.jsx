import React from "react";
import FaqCard from "./FaqCard";
import Image from "next/image";
import faqImg from "@/public/images/faq.svg";
import faqIcon from "@/public/images/i-faq-phone.svg";
import { LightOne } from "../common/svg";
import FAQList from "../common/FAQList";

const FAQ = ({ image = true }) => {
  return (
    <section className=" py-20">
      <div className="container relative">
        <LightOne className={"absolute top-0 left-0 lg:hidden "} />
        <h1 className="heading-1 text-center leading-none mx-auto max-w-[1016px]">
          Frequently Asked Question
        </h1>
        <p className="text-center my-10">
          Find answers to common questions. If you don't see your question here,
          drop us a line on our Contact Page.
        </p>

        <div className="flex gap-20">
          {image && (
            <div className="relative hidden lg:block">
              <Image src={faqImg} alt="faq" className=" rounded-[40px]" />
              <div className="flex items-center absolute min-w-fit bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 ">
                <div className="relative flex items-center bg-[#FD6801] rounded-[100px] ">
                  <Image
                    src={faqIcon}
                    alt="phone"
                    className="rounded-[100px] absolute left-0 top-1/2 -translate-y-1/2 scale-125"
                  />
                  <div className="max-h-fit rounded-[100px] ml-20 p-2 pr-3 leading-0  whitespace-nowrap">
                    <p className="text-lg">We are available 24/7</p>
                    <p className="text-xl font-extrabold">+011-51176053</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" w-full space-y-1 relative">
            <FAQList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
