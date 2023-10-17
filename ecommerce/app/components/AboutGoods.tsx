"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";

type AboutGoodsProps = {};

const AboutGoods = (props: AboutGoodsProps) => {
  const [outline, setOutline] = useState(false);
  const [detail, setDetail] = useState(false);

  const handleOutline = () => {
    setOutline(!outline);
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
          className="flex flex-row justify-between items-center w-9/12 opacity-70 cursor-pointer"
          onClick={handleOutline}
        >
          <span className=" font-medium">概要</span>
          {outline ? <FiMinus size={24} /> : <BiPlus size={24} />}
        </div>
        <div
          className={` transition-max-h duration-300 ml-10 ${
            outline ? "max-h-screen pt-4" : "max-h-0"
          } overflow-hidden`}
        >
          コンポーネントまたはプロパティ
        </div>
      </div>
      <div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between w-9/12 opacity-70 cursor-pointer"
          onClick={handleDetail}
        >
          <span className="font-medium">商品詳細</span>
          {detail ? <FiMinus size={24} /> : <BiPlus size={24} />}
        </div>
        <div
          className={`transition-max-h duration-300 ml-10 ${
            detail ? "max-h-screen pt-4" : "max-h-0"
          } overflow-hidden`}
        >
          コンポーネントまたはプロパティ
        </div>
      </div>
    </div>
  );
};

export default AboutGoods;
