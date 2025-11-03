"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "My order",
    href: "/profile/order",
  },
  {
    label: "Rewards",
    href: "/profile/rewards",
  },
];

const Links = () => {
  const pathName = usePathname();
  return (
    <div className="w-[300px] overflow-hidden rounded-[20px]  flex flex-row md:flex-col  bg-[#311E45] divide-x-2 md:divide-x-0 md:divide-y-2 divide-[#4b3662]">
      {links.map((link) => {
        const { label, href } = link;
        return (
          <Link
            href={href}
            key={href}
            className={`p-5 w-full whitespace-nowrap  text-base font-extrabold ${
              pathName === href && "bg-[#4B3662]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default Links;
