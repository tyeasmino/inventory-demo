export const revalidate = 0;
import { Button, Hero, InputGroupe } from "@/app/_components/common/Index";
// import React, { useState } from "react";
import heroImage from "@/public/images/checkout.svg";
import { LightOne, LightThree, LightTwo } from "@/app/_components/common/svg";
import { Billing } from "./_components/clinet";
import OderForm from "./_components/OrderForm";
import { use } from "react";
import { userFetchClient } from "@/app/_fetch/fetchData";

const page = () => {
  // const [formType, setFormType] = useState("details");
  const formType = "details";

  const { data: defaultData = {} } = use(
    userFetchClient(`/client/default-address/`)
  );

  const { data, status, message } =
    use(userFetchClient(`/client/reward-points/`)) || {};

  const action = async (formData) => {
    "use server";
    console.log(formData);
  };
  return (
    <div className="font-nexa relative">
      <Hero heroImg={heroImage} title="Checkout" />
      <LightTwo className={"absolute bottom-0 left-0 z-0"} />
      <LightOne className={"absolute bottom-0 right-0 z-0"} />
      <div className="container flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 my-20 relative z-20">
        <div className="flex-1">
          <div className="flex border-b border-[#432B5D]">
            <button
              // onClick={() => setFormType("details")}
              className={`font-bold text-xl md:text-[32px] p-5 flex-1 ${
                formType === "details" && "border-b-2 border-[#8732E3]"
              }  cursor-pointer`}
            >
              Delivery Details
            </button>
            <button
              // onClick={() => setFormType("payment")}
              className={`font-bold text-xl md:text-[32px] p-5 flex-1 ${
                formType === "payment" && "border-b-2 border-[#8732E3]"
              }  cursor-pointer`}
            >
              Secure Payment
            </button>
          </div>

          {/* <div
              className={`space-y-6 mt-10 ${
                formType !== "payment" && "hidden"
              }`}
            >
              <InputGroupe name="cardHolder" label="Card Holder Name" />
              <InputGroupe label="Card Number" />

              <div className="flex gap-6 flex-wrap">
                <InputGroupe label="Expiry" />
                <InputGroupe label="CVC" />
              </div>
              <Button type="submit" className={"w-full"}>
                Submit
              </Button>
            </div> */}
          <div className={` ${formType !== "details" && "hidden"}`}>
            <OderForm defaultData={defaultData} />
          </div>
        </div>
        <Billing rewards={data} />
      </div>
    </div>
  );
};

export default page;

function DetailForm() {
  return (
    <div className="mt-6 md:mt-10 space-y-4 md:space-y-6">
      <button className="px-4 py-3 border-[1.5px] border-[#7B6198] flex items-center gap-2.5 rounded-lg  text-sm font-medium text-[#FF15B9]">
        Use My Save Address{" "}
        <svg
          width={10}
          height={6}
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#FF15B9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Name */}
      <div className="flex flex-wrap items-center gap-6">
        <InputGroupe
          label="First Name"
          name="firstName"
          placeholder="Enter first name"
        />
        <InputGroupe
          label="Last Name"
          name="lastName"
          placeholder="Enter last name"
        />
      </div>

      {/* Phone */}
      <InputGroupe label="Phone" placeholder="+1  12344647478" />
      {/* Address */}
      <InputGroupe label="Address" placeholder="+1  12344647478" />

      <div className="flex gap-6 flex-wrap">
        <InputGroupe label="City" />
        <InputGroupe label="State" />
        <InputGroupe label="Zip/Postal Code" />
      </div>
      <RadioGroup />
      <p>
        {" "}
        * * * Pickup Orders: Do not come to pick up your order until you receive
        a confirmation text.{" "}
      </p>

      <div className="border border-[#9976C0] my-10"></div>

      <InputGroupe label="Who referred you?" />
      <InputGroupe label="Combo Selection" />
      <InputGroupe label="Any notes / question for your order" />

      <Button className={"w-full"}>Next</Button>
    </div>
  );
}

function RadioGroup() {
  return (
    <div className="p-4 w-fit">
      <label className="block mb-3 text-lg font-semibold">
        Delivery or Pick up? <span className="text-pink-500">*</span>
      </label>

      <div className="flex gap-10">
        {/* Delivery */}
        <label
          htmlFor="delivery"
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center">
            <input
              type="radio"
              id="delivery"
              name="deliveryOption"
              value="Delivery"
              className="hidden peer"
              required
              defaultChecked // ✅ This makes "Delivery" selected by default
            />
            <span className="peer-checked:block hidden w-2.5 h-2.5 bg-white rounded-full"></span>
          </span>
          <span className="font-semibold text-lg">Delivery</span>
        </label>

        {/* PickUp */}
        <label
          htmlFor="pickup"
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center">
            <input
              type="radio"
              id="pickup"
              name="deliveryOption"
              value="PickUp"
              className="hidden peer"
            />
            <span className="peer-checked:block hidden w-2.5 h-2.5 bg-white rounded-full"></span>
          </span>
          <span className="font-semibold text-lg">PickUp</span>
        </label>
      </div>
    </div>
  );
}
