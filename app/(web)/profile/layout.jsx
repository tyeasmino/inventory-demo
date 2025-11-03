import { Avatar } from "@/app/_components/common/svg";
import Link from "next/link";
import React, { use } from "react";
import Links from "./_compoenets/Links";
import { userFetchClient } from "@/app/_fetch/fetchData";
import SetUserData from "./_compoenets/setProfileCoockie";
import { cookies } from "next/headers";

const ProfileLayout = ({ children }) => {
  return (
    <div className="container mt-[200px] font-nexa">
      <div className="w-full md:w-[95%] 2xl:w-[90%] mx-auto">
        <div className="rounded-[40px] grid place-items-center bg-[linear-gradient(111deg,_rgba(135,50,227,0.5)_41.17%,_rgba(255,21,185,0.5)_100.77%)] backdrop-blur-[100px] h-[200px] md:h-[400px]">
          <div className="grid place-items-center">
            <UserInfo />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 my-11 ">
          {/* navigation */}
          <Links />

          <div className="w-full lg:w-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;

function UserInfo() {
  const { data } = use(userFetchClient(`/api/myDetails/`));

  async function setUserName() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set({
      name: "user",
      value: JSON.stringify({
        name: data?.first_name + data?.last_name,
        email: data?.email,
        username: data?.username,
      }),
      httpOnly: true,
      path: "/",
    });
  }

  return (
    <>
      <SetUserData action={setUserName} />
      <Avatar />

      <p className="text-2xl font-extrabold capitalize">
        {data?.first_name + " " + data?.last_name}
      </p>
      <p className="text-base text-[#D5BBF2]">
        {data?.email || data?.username}
      </p>
    </>
  );
}
