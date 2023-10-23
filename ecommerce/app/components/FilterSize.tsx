"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterSizeProps = {
  isFilterSize: any;
  setIsFilterSize: any;
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
};

const FIlterSize = (props: FilterSizeProps) => {
  const toggleSize = (size: string) => {
    props.setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((c) => c !== size)
        : [...prevSize, size]
    );
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>サイズを選択</div>
        <button
          onClick={() => {
            props.setIsFilterSize(!props.isFilterSize);
          }}
        >
          <div className="flex flex-col items-center">
            <AiOutlineClose size={24} />
            <span className="text-sm">閉じる</span>
          </div>
        </button>
      </div>
      <div className="mt-2">
        <ul className="grid grid-cols-4 px-5 gap-5">
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("XS")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("XS")}
          >
            XS
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("S")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("S")}
          >
            S
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("M")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("M")}
          >
            M
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("L")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("L")}
          >
            L
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("XL")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("XL")}
          >
            XL
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("XXL")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("XXL")}
          >
            XXL
          </li>
          <li
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
              props.selectedSize.includes("3XL")
                ? "bg-neutral-900 text-white"
                : ""
            }`}
            onClick={() => toggleSize("3XL")}
          >
            3XL
          </li>
        </ul>
      </div>
    </>
  );
};

export default FIlterSize;
