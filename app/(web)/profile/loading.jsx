import { Loading } from "@/app/_components/common/Index";
import React from "react";

const loading = () => {
  return (
    <div className="w-full py-10 md:py-20 grid place-items-center">
      <Loading />
    </div>
  );
};

export default loading;
