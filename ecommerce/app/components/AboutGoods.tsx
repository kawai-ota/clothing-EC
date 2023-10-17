"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

type AboutGoodsProps = {};

const AboutGoods = (props: AboutGoodsProps) => {
  const [outLine, setOutLine] = useState(false);
  const [detail, setDetail] = useState(false);

  const handleOutLine = () => {
    setOutLine(!outLine);
  };

  const handleDetail = () => {
    setDetail(!detail);
  };

  return (
    <div>
      <div className="flex items-center space-x-5 mb-10">
        <span className="w-[5px] h-[30px] bg-[#3EBCB5] rounded-full inline-block" />
        <span className="font-medium text-xl">この商品について</span>
      </div>
      <div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between w-9/12 opacity-70 cursor-pointer"
          onClick={handleOutLine}
        >
          <span className="font-medium">概要</span>
          <BiPlus size={24} />
        </div>
      </div>
      <div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between w-9/12 opacity-70 cursor-pointer"
          onClick={handleDetail}
        >
          <span className="font-medium">商品詳細</span>
          <BiPlus size={24} />
        </div>
      </div>
    </div>
  );
};

export default AboutGoods;
