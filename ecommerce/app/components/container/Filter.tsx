"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";

type Props = {};

const Filter = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [allHexValues, setHexValues] = useState<string[]>([]);
  const [selectedHexValues, setSelectedHexValues] = useState<string[]>([]);
  const [price, setPrice] = useState({ min: 0, max: 100 });

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.name]: value,
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.value]: value,
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedCategories((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((c) => c !== size)
        : [...prevSize, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedCategories((prevColor) =>
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
      console.log("エラーです", error);
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
        setHexValues(uniqueHexValues);
      }
    });
  }, []);

  const allHexValue = allHexValues;
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
        <div className="flex flex-col py-3 pb-5 text-sm text-neutral-600 border-b-[0.5px]">
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Blouses") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Blouses")}
          >
            ブラウス
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Shirt") ? "bg-purple-500" : ""
            }`}
          >
            シャツ
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Denim&Jeans") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Denim&Jeans")}
          >
            デニム/ジーンズ
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Party") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Party")}
          >
            ワンピース/ドレス
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Pants") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Pants")}
          >
            パンツ
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Skirts") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Skirts")}
          >
            スカート
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Tops&tees") ? "bg-purple-500" : ""
            }`}
            onClick={() => toggleCategory("Tops&tees")}
          >
            トップス
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Jackets&Coats")
                ? "bg-purple-500"
                : ""
            }`}
            onClick={() => toggleCategory("Jackets&Coats")}
          >
            ジャケット/アウター
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
                  value={price.min}
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
                  value={price.max}
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-[0.5px]">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Colors</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5 mb-4">
            {allHexValue.map((hexvalue, index) => (
              <li
                key={index}
                className={`w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${
                  selectedHexValues.includes(`#${hexvalue}`)
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
                selectedSize.includes("S") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => toggleSize("S")}
            >
              S
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("M") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => toggleSize("M")}
            >
              M
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("L") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => toggleSize("L")}
            >
              L
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("XL") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => toggleSize("XL")}
            >
              XL
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("2XL") ? "bg-neutral-900 text-white" : ""
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
        className="absolute md:hidden top-[20px] right-[-42px]  bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        フィルター
      </div>
    </div>
  );
};

export default Filter;
