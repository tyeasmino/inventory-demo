"use client";
import { postUserRelatedData, putUserRelatedData } from "@/app/_actions";
import { Button, InputGroupe, Loading } from "@/app/_components/common/Index";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const UserInfoForm = ({ initialData }) => {
  const { first_name, last_name, phone } = initialData || {};
  console.log("=== initialData ===");
  console.log(initialData);

  const [state, action, pending] = useActionState(async (_, formData) => {
    return await putUserRelatedData({
      url: `/client/update-profile/`,
      body: formData,
      revalidate: "/profile",
    });
  });
  console.log(state);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("User info updated successfully!");
    } else if (state?.status === "error") {
      toast.error(state?.message || "Failed to update user info.");
    }
  }, [state]);
  return (
    <form action={action} className="mt-6 md:mt-10 space-y-6 md:space-y-10 ">
      <div className="flex flex-col md:flex-row gap-8 ">
        <InputGroupe
          label="First Name"
          name="first_name"
          defaultValue={first_name}
        />
        <InputGroupe
          label="Last Name"
          name="last_name"
          defaultValue={last_name}
        />
      </div>
      <InputGroupe label="Phone Number" name="phone" defaultValue={phone} />
      <Button type="submit" disabled={pending}>
        {pending ? <Loading /> : "Update"}
      </Button>
    </form>
  );
};

export default UserInfoForm;
