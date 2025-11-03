import React from "react";
import SubscribeForm from "./SubscribeForm";

const Connected = () => {
  return (
    <section className="mb-[106px] mt-[174px]">
      <div className="container p-5 md:p-10 lg:px-20 lg:py-[60px] lg:min-w-[610px] flex gap-10 flex-col lg:flex-row items-center justify-between rounded-[40px] border-2 border-[#FFFFFF66] bg-[#FFFFFF1A] shadow-[inset_0px_0px_16px_0px_rgba(0,0,0,0.25)]">
        <div className="text-center md:text-left space-y-[18px]">
          <h3 className="text-3xl font-extrabold">GET CONNECTED WITH US</h3>
          <p className="text-sm md:text-base">
            Enjoy tea that looks as good as it tastes. Our blends are crafted
            for both beauty and flavor. Try them today!
          </p>
        </div>
        <SubscribeForm />
      </div>
    </section>
  );
};

export default Connected;
