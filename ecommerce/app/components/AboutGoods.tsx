"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";

type AboutGoodsProps = {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  style?: string;
  store?: string;
  size?: string;
  inventory?: number;
  color?: string;
  price?: number;
  images?: string;
  userId?: number;
};

const AboutGoods = (props: AboutGoodsProps) => {
  const [outline, setOutline] = useState(false);
  const [detail, setDetail] = useState(false);
  const descriptionHtml = props.description || "";

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
          <div className="flex flex-col justify-center w-9/12">
            <div className="grid grid-cols-3 gap-7 mb-5">
              <div>
                <h3 className="font-medium">カテゴリー</h3>
                <p className="text-sm">{props.category}</p>
              </div>
              <div className="">
                <h3 className="font-medium">ファッション</h3>
                <p className="text-sm">{props.style}</p>
              </div>
              <div className="">
                <h3 className="font-medium">ブランド名</h3>
                <p className="text-sm">{props.store}</p>
              </div>
            </div>
          </div>
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
          <div
            className="leading-6 text-sm text-neutral-700 h-[200px] rounded-md p-2 w-9/12"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutGoods;
