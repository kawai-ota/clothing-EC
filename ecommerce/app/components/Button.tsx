"use client";
import axios from "axios";
import React from "react";

type ButtonProps = {
  allIds: number[];
  userId?: number;
};

const Button = ({ allIds, userId }: ButtonProps) => {
  const onCheckout = async () => {
    const response = await axios.post("/api/checkout", {
      productIds: allIds,
      userId: userId,
    });
    window.location = response.data.url;
  };
  return (
    <div className="flex items-center justify-center mt-20 cursor-pointer">
      <span
        onClick={onCheckout}
        className="px-10 p-2 text-white bg-[#3EBCB5] hover:bg-[#46cdc6] rounded-full"
      >
        購入する
      </span>
    </div>
  );
};

export default Button;
