import React from "react";

const Loading = ({ className }) => {
  return (
    <div className={`w-full grid place-items-center ${className}`}>
      <svg
        className="size-10"
        fill="hsl(228, 97%, 42%)"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="RadialGradient8932">
            <stop offset="0%" stopColor="currentColor" stopOpacity={1} />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@keyframes spin8932 {\n            to {\n                transform: rotate(360deg);\n            }\n        }\n\n        #circle8932 {\n            transform-origin: 50% 50%;\n            stroke: url(#RadialGradient8932);\n            fill: none;\n            animation: spin8932 .5s infinite linear;\n            :\n\n        }",
          }}
        />
        <circle cx={10} cy={10} r={8} id="circle8932" strokeWidth={2} />
      </svg>
    </div>
  );
};

export default Loading;
