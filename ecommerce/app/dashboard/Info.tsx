"use client";
import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCubeFocusThin } from "react-icons/pi";
import { AiTwotoneEdit } from "react-icons/ai";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddCart from "../components/AddCart";
import AboutPayment from "../components/AboutPayment";
import AboutSize from "../components/AboutSize";
import AboutShip from "../components/AboutShip";
import AboutReturn from "../components/AboutReturn";

interface InfoProps {
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
}

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
  const [isPaymentAccordionOpen, setPaymentAccordionOpen] = useState(false);
  const [isSizeAccordionOpen, setSizeAccordionOpen] = useState(false);
  const [isShippingAccordionOpen, setShippingAccordionOpen] = useState(false);
  const [isReturnAccordionOpen, setReturnAccordionOpen] = useState(false);

  const handleSelectSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prevState: string[]) =>
        prevState.filter((item) => item !== size)
      );
    } else {
      setSelectedSizes((prevState: string[]) => [...prevState, size]);
    }
  };

  const handleTogglePaymentAccordion = () => {
    setPaymentAccordionOpen(!isPaymentAccordionOpen);
  };

  const handleToggleSizeAccordion = () => {
    setSizeAccordionOpen(!isSizeAccordionOpen);
  };

  const handleToggleShippingAccordion = () => {
    setShippingAccordionOpen(!isShippingAccordionOpen);
  };

  const handleToggleReturnAccordion = () => {
    setReturnAccordionOpen(!isReturnAccordionOpen);
  };

  return (
    <div className="relative info">
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
        />
      ))}
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
            style={{
              borderRadius: "100%",
              display: "inline-block",
            }}
          >
            {size}
          </li>
        ))}
      </ul>
      <h1 className="text-2xl mt-10">￥{price}</h1>
      <div className="flex items-center mt-7 space-x-10">
        <AddCart productId={id} />
      </div>
      <hr className="w-9/12 mt-3" />
      <div className="gap-10 opacity-70 mt-5">
        <div
          className="flex flex-row justify-between items-center w-9/12 cursor-pointer"
          onClick={handleTogglePaymentAccordion}
        >
          <span className="text-sm flex items-center space-x-4">
            <span className="p-2 bg-gray-100 inline-block rounded-full">
              <CiCreditCard1 size={24} />
            </span>
            <p>お支払い方法について</p>
          </span>
          <span className="transform transition-transform duration-300">
            {isPaymentAccordionOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>
        <div
          className={`transition-max-h duration-300 ${
            isPaymentAccordionOpen ? "max-h-screen pt-2" : "max-h-0"
          } overflow-hidden`}
        >
          <AboutPayment />
        </div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between items-center w-9/12 cursor-pointer"
          onClick={handleToggleSizeAccordion}
        >
          <span className="text-sm flex items-center  space-x-4">
            <span className="p-2 bg-gray-100 inline-block rounded-full">
              <SlTag size={24} />
            </span>
            <p>サイズについて</p>
          </span>
          <span className="transform transition-transform duration-300">
            {isSizeAccordionOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>
        <div
          className={`transition-max-h duration-300 ${
            isSizeAccordionOpen ? "max-h-screen pt-2" : "max-h-0"
          } overflow-hidden`}
        >
          <AboutSize />
        </div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between items-center w-9/12 cursor-pointer"
          onClick={handleToggleShippingAccordion}
        >
          <span className="text-sm flex items-center space-x-4">
            <span className="p-2 bg-gray-100 inline-block rounded-full">
              <LiaShippingFastSolid size={24} />
            </span>
            <p>送料について</p>
          </span>
          <span className="transform transition-transform duration-300">
            {isShippingAccordionOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>
        <div
          className={`transition-max-h duration-300 ${
            isShippingAccordionOpen ? "max-h-screen pt-2" : "max-h-0"
          } overflow-hidden`}
        >
          <AboutShip />
        </div>
        <hr className="w-9/12 my-3" />
        <div
          className="flex flex-row justify-between items-center w-9/12 cursor-pointer"
          onClick={handleToggleReturnAccordion}
        >
          <span className="text-sm flex items-center space-x-4">
            <span className="p-2 bg-gray-100 inline-block rounded-full">
              <PiCubeFocusThin size={24} />
            </span>
            <p>返品について</p>
          </span>
          <span className="transform transition-transform duration-300">
            {isReturnAccordionOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>
        <div
          className={`transition-max-h duration-300 ${
            isReturnAccordionOpen ? "max-h-screen pt-2" : "max-h-0"
          } overflow-hidden`}
        >
          <AboutReturn />
        </div>
      </div>
      {currentUserId === userId && (
        <Link href={`/edit/${id}`}>
          <span className="absolute top-0 right-0 p-2 bg-[#3EBCB5] rounded-full text-white cursor-pointer">
            <AiTwotoneEdit />
          </span>
        </Link>
      )}
    </div>
  );
};

export default Info;
