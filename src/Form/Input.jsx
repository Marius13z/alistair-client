import React from "react";

const Input = ({
  label,
  handleChange,
  name,
  type,
  minlength,
  maxlength,
  size,
  required,
  text,
  textarea,
}) => {
  return (
    <div>
      <label className="ml-1 font-medium text-sm text-secondary">{label}</label>
      {textarea ? (
        <textarea
          onChange={handleChange}
          required={required}
          maxLength={maxlength}
          placeholder={text}
          className="w-full placeholder:text-gray-400 border p-3 text-xs outline-none text-secondary border-gray-200 rounded-lg h-40"
        />
      ) : (
        <input
          required
          minLength={minlength}
          maxLength={maxlength}
          size={size}
          type={type}
          className="border border-gray-200 rounded-xl text-xs p-3 outline-none text-secondary w-full"
          placeholder={text}
          onChange={handleChange}
          name={name}
        />
      )}
    </div>
  );
};

export default Input;
