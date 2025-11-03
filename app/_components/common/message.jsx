import React from "react";

export const Error = ({ message = "There was an error!" }) => {
  return (
    <div className="p-6 rounded-lg border border-red-500">
      <p className="text-red-500 text-2xl font-bold">{message}</p>
    </div>
  );
};

export const Warning = ({ message = "Data not found!" }) => {
  return (
    <div className="p-6 rounded-lg border text-yellow-400">
      <p className="text-yellow-400 text-2xl font-bold">{message}</p>
    </div>
  );
};
