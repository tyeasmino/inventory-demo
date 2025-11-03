import React, { Suspense } from "react";
import { Error, Loading, Warning } from "./Index";

const QueryBoundary = ({
  children,
  status,
  count = 0,
  errorMsg,
  warningMsg = "Data not found!",
}) => {
  return (
    <>
      {status === "error" ? (
        <Error message={errorMsg || "There was an error"} />
      ) : count === 0 ? (
        <Warning message={warningMsg} />
      ) : (
        <Suspense fallback={<Loading />}>{children}</Suspense>
      )}
    </>
  );
};

export default QueryBoundary;
