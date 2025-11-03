import React from "react";
import { Loading } from "@/app/_components/common/Index";

const loading = () => {
  return (
    <div className="w-full py-10 md:py-80 grid place-items-center">
      <Loading />
    </div>
  );
};

export default loading;
