import React, { use } from "react";
import heroImg from "@/public/images/about-bg.svg";
import { Button, Hero } from "@/app/_components/common/Index";
import { FAQ } from "@/app/_components/home";
import FaceInIcon from "@/app/_components/common/FaceInIcon";
import ContactForm from "./ContactForm";
import { getSiteData } from "@/app/_fetch/fetchData";

const ContactPage = () => {
  const data = use(getSiteData());
  return (
    <div>
      <Hero heroImg={data?.contactUs} title="Contact Us" />

      <section className="pt-20 pb-32">
        <div className="container flex flex-col xl:flex-row gap-10 md:gap-0  justify-center">
          <div className="px-6 md:px-10 py-10 md:py-20 flex-1 rounded-[40px] large:translate-x-[110px] space-y-6 md:max-w-[596px] xl:max-w-[978px] bg-[linear-gradient(111deg,_rgba(135,50,227,0.2)_41.17%,_rgba(255,21,185,0.2)_100.77%)] backdrop-blur-[100px]">
            <h1 className="text-[54px] xl:text-[100px] font-bold uppercase leading-none max-w-[697px]">
              Get Connect With Us
            </h1>
            <p className="text-base max-w-[641px]">
              Please submit all general enquiries in the contact form below and
              we look forward to hearing from you soon.
            </p>
            <FaceInIcon />
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="py-20">
        <FAQ image={false} />
      </section>
    </div>
  );
};

export default ContactPage;
