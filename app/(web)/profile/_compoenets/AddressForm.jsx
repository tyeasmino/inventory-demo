"use client";
import {
  addressAction,
  postUserRelatedData,
  updateUserRelatedData,
} from "@/app/_actions";
import {
  Button,
  InputGroupe,
  Loading,
  Modal,
} from "@/app/_components/common/Index";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddressForm = ({ isOpen, setIsOpen, editable }) => {
  const isEditable = editable?.id;
  const [state, action, pending] = useActionState(async (_, formData) => {
    if (isEditable) {
      return await addressAction({
        url: `/client/addresses/${isEditable}/`,
        body: formData,
        revalidate: "/profile",
        edit: true,
      });
    } else {
      return await addressAction({
        url: `/client/addresses/`,
        body: formData,
        revalidate: "/profile",
        edit: false,
      });
    }
  });

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
  } = (state?.prev && Object.fromEntries(state?.prev)) || {};

  const {
    first_name: editableFirstName,
    last_name: editableLastName,
    company: editableCompany,
    phone: editablePhone,
    address: editableAddress,
    city: editableCity,
    zip_code: editableZipCode,
    state: editableState,
    is_default: editableIsDefault,
  } = editable || {};

  useEffect(() => {
    if (state?.status === "success") {
      setIsOpen(false);
      toast.success(editable ? "Address edited!" : "Address added!");
    }

    if (state?.status === "error") {
      toast.error(state?.message || "There was an error");
    }
  }, [state]);
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="grid place-items-center relative border-b-2 mb-5 border-[#7B6198] pb-5 text-2xl font-bold ">
            <p>{isEditable ? "Edit" : "Add New"} Address</p>
            <span
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer right-0 top-0 rotate-45 text-5xl leading-0"
            >
              +
            </span>
          </div>
          <form action={action} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <InputGroupe
                label="First Name"
                name="first_name"
                required
                defaultValue={editableFirstName || first_name}
              />
              <InputGroupe
                label="Last Name"
                name="last_name"
                defaultValue={editableLastName || last_name}
              />
            </div>

            <InputGroupe
              label="Company Name"
              name="company"
              defaultValue={editableCompany || company}
            />
            <InputGroupe
              label="Phone Number"
              name="phone"
              required
              defaultValue={editablePhone || phone}
            />
            <InputGroupe
              label="Address "
              name="address"
              required
              defaultValue={editableAddress || address}
            />

            <div className="flex flex-col md:flex-row gap-6">
              <InputGroupe
                label="City"
                name="city"
                required
                defaultValue={editableCity || city}
              />
              <InputGroupe
                label="State"
                name="state"
                required
                defaultValue={editableState || stateValue}
              />
              <InputGroupe
                label="Zip Code"
                name="zip_code"
                required
                defaultValue={editableZipCode || zip_code}
              />
            </div>

            <div className="flex gap-2.5 items-center">
              <input
                type="checkbox"
                name="is_default"
                defaultChecked={is_default || editableIsDefault}
                id=""
                value={true}
                className="size-5 bg-none border border-[#7B6198]"
              />
              <p>Make this my default address</p>
            </div>
            <Button className={"w-full"} type="submit" disabled={pending}>
              {pending ? <Loading /> : "Submit"}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddressForm;
