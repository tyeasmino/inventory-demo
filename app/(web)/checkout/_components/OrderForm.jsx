"use client";

import { orderAction } from "@/app/_actions";
import { Button, InputGroupe, Loading } from "@/app/_components/common/Index";
import { CartContext } from "@/app/_context/cartContext";
import {
  Autocomplete,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { use, useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function OderForm({ defaultData = {} }) {
  console.log("defaultData", defaultData);
  const inputRef = useRef();
  const { isLoaded } = useJsApiLoader({
    id: "ssdf",
    googleMapsApiKey: "AIzaSyDZRTKcPUIVkcLWHjCXMqPMTZEUKncoLEk",
    libraries: ["places"],
  });
  const { carts, onClear } = use(CartContext);
  const router = useRouter();
  const [state, action, pending] = useActionState(async (_, formData) => {
    // if (isEditable) {
    //   return await updateUserRelatedData({
    //     url: `/client/addresses/${isEditable}/`,
    //     body: formData,
    //     revalidate: "/profile",
    //   });
    // } else {
    //   return await postUserRelatedData({
    //     url: `/client/addresses/`,
    //     body: formData,
    //     revalidate: "/profile",
    //   });
    // }

    // if (defaultData) {
    //   return {
    //     delivery_type: "delivery",
    //     delivery_address: 11,
    //     ordered_from_branch: 2,
    //     items: [
    //       {
    //         product_sku_code: "23562",
    //         quantity: 1,
    //       },
    //     ],
    //     ...formData,
    //   };
    // }

    return await orderAction(formData, defaultData, carts);
  });

  const formValue = state?.formValue || {};

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Order success!");
      router.push("/profile/order");
      onClear();
    }
    if (state?.status === "error") {
      toast.error(state?.message || "There was an error!");
    }
  }, [state]);

  const {
    first_name,
    last_name,
    company,
    phone,
    address,
    city,
    zip_code,
    state: stateValue,
    is_default,
  } = { ...defaultData, ...formValue } || {};

  const isReadonly = defaultData?.id;

  const handleOnPlaceChange = () => {
    let address = inputRef.current.getPlaces();
    console.log("address :", address);
  };
  // useEffect(() => {
  //   if (state?.status === "success") {
  //     // setIsOpen(false);
  //     toast.success("Address added!");
  //   }

  //   if (state?.status === "error") {
  //     toast.error(state?.message || "There was an error");
  //   }
  // }, [state]);
  return (
    <>
      <button className="px-4 py-3 my-5 border-[1.5px] border-[#7B6198] flex items-center gap-2.5 rounded-lg  text-sm font-medium text-[#FF15B9]">
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
      <form action={action} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <InputGroupe
            label="First Name"
            name="first_name"
            defaultValue={first_name}
            readOnly={isReadonly}
          />
          <InputGroupe
            label="Last Name"
            name="last_name"
            defaultValue={last_name}
            readOnly={isReadonly}
          />
        </div>

        <InputGroupe
          label="Company Name"
          name="company"
          defaultValue={company}
          readOnly={isReadonly}
        />
        <InputGroupe
          label="Phone Number"
          name="phone"
          defaultValue={phone}
          readOnly={isReadonly}
        />
        {isReadonly ? (
          <InputGroupe
            label="Address "
            name="address"
            readOnly
            defaultValue={address}
          />
        ) : (
          isLoaded && (
            // <StandaloneSearchBox
            //   onLoad={(ref) => (inputRef.current = ref)}
            //   onPlacesChanged={handleOnPlaceChange}
            // >
            // <Autocomplete>
            <InputGroupe
              label="Address "
              name="address"
              defaultValue={address}
            />
            // </Autocomplete>
            // </StandaloneSearchBox>
          )
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <InputGroupe
            label="City"
            name="city"
            defaultValue={city}
            readOnly={isReadonly}
          />
          <InputGroupe
            label="State"
            name="state"
            defaultValue={stateValue}
            readOnly={isReadonly}
          />
          <InputGroupe
            label="Zip Code"
            name="zip_code"
            defaultValue={zip_code}
            readOnly={isReadonly}
          />
        </div>

        {/* <input
          type="checkbox"
          name="is_default"
          defaultChecked={is_default || editableIsDefault}
          id=""
          value={true}
          className="size-5 bg-none border border-[#7B6198]"
        /> */}
        <RadioGroup />
        <p>
          {" "}
          * * * Pickup Orders: Do not come to pick up your order until you
          receive a confirmation text.{" "}
        </p>

        <div className="border border-[#9976C0] my-10"></div>

        <InputGroupe label="Who referred you?" name="referred_by" />
        <InputGroupe label="Combo Selection" name="combo_selection" />
        <InputGroupe
          label="Any notes / question for your order"
          name="order_notes"
        />

        <Button type="submit" className={"w-full"} disabled={pending}>
          {pending ? <Loading /> : "Submit"}
        </Button>
      </form>
    </>
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
              value="delivery"
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
              value="pickup"
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
