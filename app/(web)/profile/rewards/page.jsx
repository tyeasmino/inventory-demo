import { userFetchClient } from "@/app/_fetch/fetchData";
import React, { use } from "react";
import RewardsProgresses from "../_compoenets/RewardsProgresses";

const page = () => {
  const { data, status, message } =
    use(userFetchClient(`/client/reward-points/`)) || {};

  return (
    <div>
      <Component rewards={data} />
    </div>
  );
};

export default page;

function Component({ rewards }) {
  return (
    <div className="">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex gap-2.5 items-end mb-10 pb-4 border-b-2 border-[#D5BBF2] ">
          <p className="text-4xl font-bold">{rewards?.points}</p>
          <p className="text-2xl font-light text-[#D5BBF2] ">Reward Point</p>
        </div>

        {/* Progress Cards */}
        <RewardsProgresses rewards={rewards?.rewards} />

        {/* How to earn more points link */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-[#d1a9fb] text-lg hover:text-[#7b6198] transition-colors">
            How to earn more points
          </button>
        </div>
      </div>
    </div>
  );
}
