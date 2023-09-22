"use client";
import React from "react";

type ButtonProps = {
  allIds: number[];
  userId?: number;
};

const Button = (props: ButtonProps) => {
  return (
    <div className="flex items-center justify-center mt-20 cursor-pointer">
      <span className="px-10 p-2 text-white bg-purple-600 rounded-full">
        戻る
      </span>
    </div>
  );
};

export default Button;
