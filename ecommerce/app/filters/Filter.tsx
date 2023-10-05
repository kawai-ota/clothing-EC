"use client";
import React, { useState, useEffect } from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";
import axios from "axios";

type FilterProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
  allHexValues: string[];
  setAllHexValues: React.Dispatch<React.SetStateAction<string[]>>;
  selectedHexValues: string[];
  setSelectedAllHexValues: React.Dispatch<React.SetStateAction<string[]>>;
  price: { min: number; max: number };
  setPrice: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
};

const Filter = (props: FilterProps) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
    props.setPrice({
      ...props.price,
      [e.target.name]: value,
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
    props.setPrice({
      ...props.price,
      [e.target.name]: value,
    });
  };

  const toggleCategory = (category: string) => {
    props.setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const toggleSize = (size: string) => {
    props.setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((c) => c !== size)
        : [...prevSize, size]
    );
  };

  const toggleColor = (color: string) => {
    props.setSelectedAllHexValues((prevColor) =>
      prevColor.includes(color)
        ? prevColor.filter((c) => c !== color)
        : [...prevColor, color]
    );
  };

  const getAllColors = async () => {
    try {
      const response = await axios.get("/api/color");
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  };

  useEffect(() => {
    getAllColors().then((allColors) => {
      if (allColors) {
        const hextSet = new Set<string>();
        allColors.forEach((element: any) => {
          const colors = element.color.split(",");
          colors.forEach((color: string) => {
            const hextValue = color.replace("#", "");
            hextSet.add(hextValue);
          });
        });
        const uniqueHexValues: string[] = Array.from(hextSet);
        props.setAllHexValues(uniqueHexValues);
      }
    });
  }, []);

  const allHexValue = props.allHexValues;

  return (
    <div className="relative">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${
          showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-neutral-800">フィルター</h1>
          <BsSliders2Vertical size={20} className="text-neutral-600" />
        </div>
        <div className="flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]">
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("トップス")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("トップス")}
          >
            トップス
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("ジャケット/アウター")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("ジャケット/アウター")}
          >
            ジャケット/アウター
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("ボトムス")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("ボトムス")}
          >
            ボトムス
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("Party") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Party")}
          >
            ワンピース/ドレス
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("スカート")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("スカート")}
          >
            スカート
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("バッグ") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("バッグ")}
          >
            バッグ
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("シューズ")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("シューズ")}
          >
            シューズ
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("ステッカー")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("ステッカー")}
          >
            ステッカー
          </span>
        </div>
        <div className="border-b-[0.5px] pb-10">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">値段</h1>
            <BsChevronUp size={18} className="text-neutral-600" />
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                最安値
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">￥</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="min"
                  onChange={handleMinChange}
                  value={props.price.min}
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                最高値
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">￥</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="max"
                  onChange={handleMaxChange}
                  value={props.price.max}
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-[0.5px]">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">カラー</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5 mb-4">
            {allHexValue.map((hexvalue, index) => (
              <li
                key={index}
                className={`w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${
                  props.selectedHexValues.includes(`#${hexvalue}`)
                    ? "shadow-2xl opacity-25"
                    : ""
                }`}
                style={{ backgroundColor: `#${hexvalue}` }}
                onClick={() => toggleColor(`#${hexvalue}`)}
              ></li>
            ))}
          </ul>
        </div>
        <div className="sizes">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">サイズ</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5">
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
                props.selectedSize.includes("2XL")
                  ? "bg-neutral-900 text-white"
                  : ""
              }`}
              onClick={() => toggleSize("2XL")}
            >
              2XL
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        Filters
      </div>
    </div>
  );
};

export default Filter;
