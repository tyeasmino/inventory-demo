"use client";

import { debounce } from "@/app/_utils/debouns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { getTrackBackground, Range } from "react-range";

const PriceRange = ({ min = 0, max = 1000, step = 1 }) => {
  const params = useSearchParams();
  const minValue = Number(params.get("min")) || min;
  const maxValue = Number(params.get("max")) || max;

  const [values, setValues] = useState([minValue, maxValue]);
  const router = useRouter();

  // Debounced router.push only
  const updateURL = useCallback(
    debounce((values) => {
      router.push(`?min=${values[0]}&max=${values[1]}`, { scroll: false });
    }, 250),
    []
  );

  const handleChange = (values) => {
    setValues(values); // Update UI immediately for smoothness
    updateURL(values); // Debounced router update
  };

  return (
    <>
      <div className="flex justify-between items-center text-center font-medium mb-3">
        <span>{values[0]} $</span>
        <span>{values[1]} $</span>
      </div>
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props: { key, ...props }, children }) => (
          <div
            key={key + crypto.randomUUID()}
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              borderRadius: "6px",
              background: getTrackBackground({
                values,
                colors: ["#BDBDBD", "#8732E3", "#BDBDBD"],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "100%",
              border: "none",
              boxShadow: "none",
              backgroundColor: "#8732E3",
            }}
          />
        )}
      />
    </>
  );
};

export default PriceRange;
