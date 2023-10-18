"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required: true })}
        className={clsx(
          `p-2 border-gray-300 border-[2px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-[#3EBCB5] text-black`,
          errors[id] && "focus:ring-rose-500",
          disabled && ""
        )}
      />
    </div>
  );
};

export default Input;
