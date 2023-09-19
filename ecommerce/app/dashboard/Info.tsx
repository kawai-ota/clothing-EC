"use client";
import React, { useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShoppingCart, CiCreditCard1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCubeFocusThin } from "react-icons/pi";
import { AiTwotoneEdit } from "react-icons/ai";
import Size from "../components/Size";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddCart from "../components/AddCart";

type InfoProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  style: string;
  store: string;
  size: string;
  inventory: number;
  color: string;
  price: number;
  images: string;
  userId: number;
  //   rating: number;
  //   numbercomments: number;
};

const Info: React.FC<InfoProps> = ({
  title,
  description,
  id,
  price,
  color,
  size,
  userId,
  store,
}) => {
  const colors = color.split(",");
  const sizes = size.split(",");
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSelectSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prevState: string[]) =>
        prevState.filter((item) => item !== size)
      );
    } else {
      setSelectedSizes((prevState: string[]) => [...prevState, size]);
    }
  };
  return (
    <div className="relative info">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <h3 className="text-sm text-neutral-500">{store}</h3>
      <div className="flex items-center space-x-12 mt-4">
        <ReactStars value={2} size={20} />
        <span className="flex items-start space-x-3">
          <FaRegCommentDots size={22} />
          <span className="opacity-70 text-sm">121のコメント</span>
        </span>
      </div>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">サイズを選択</h3>
      <ul className="flex space-x-5">
        {sizes.map((size, index) => (
          <li
            key={index}
            className={`p-1 px-2 border-[1px] rounded-lg cursor-pointer inline-block text-center ${
              selectedSizes.includes(size)
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSelectSize(size)}
          >
            {size}
          </li>
        ))}
      </ul>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">
        カラーバリエーション
      </h3>
      {colors.map((color, index) => (
        <div
          key={index}
          className="relative w-[35px] h-[35px] border-[1px] border-neutral-400 m-1"
          style={{
            borderRadius: "100%",
            backgroundColor: color,
            display: "inline-block",
          }}
        >
          <span
            className="w-[30px] h-[30px] rounded-full flex top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] absolute border-[1px]"
            style={{ backgroundColor: color }}
          ></span>
        </div>
      ))}
      <div className="flex items-center mt-7 space-x-10">
        <AddCart productId={id} />
      </div>
    </div>
  );
};

export default Info;
