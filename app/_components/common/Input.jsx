import React from "react";

const InputGroupe = ({
  type = "text",
  name = "",
  placeholder = "",
  label = "",
  error,
  defaultValue,
  required = false,
  ...props
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <label htmlFor="" className="text-sm font-extrabold">
        {label} {required && <span className="text-red-600 text-lg">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="px-3 py-3 md:px-[15px]  bg-[#4B3662] border border-[#7B6198] rounded-[12px] text-[#D5BBF2] placeholder:text-[#D5BBF2]"
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputGroupe;
