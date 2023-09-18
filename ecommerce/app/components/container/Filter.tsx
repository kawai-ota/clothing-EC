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
      </div>
    </div>
  );
};

export default Filter;
