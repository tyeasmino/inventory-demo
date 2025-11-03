import React from "react";

const RewardsProgresses = ({ rewards = [], small = false }) => {
  return (
    <div className={` ${small && "scale-y-90"} space-y-8`}>
      {rewards?.map((item, index, arr) => {
        const { progress, name } = item;
        const [total, current] = progress.split("/").map(Number);
        const progressPercentage = (total / current) * 100;

        return (
          <div key={index}>
            <div className="bg-[#4b3662] rounded-2xl p-6 relative overflow-hidden">
              {/* Content */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-medium">{name}</h2>
                <span className="text-white text-lg">
                  {total}/{current}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#7b6198] rounded-full h-2 relative overflow-hidden">
                <div
                  className="bg-[#ff15b9] h-2 rounded-full transition-all duration-300 overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Dotted separator (except for last item) */}
            {index < arr.length - 1 && !small && (
              <div className="border-t-2 border-dashed border-gray-400 my-8" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RewardsProgresses;
