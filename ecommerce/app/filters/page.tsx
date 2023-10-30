"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import FilterCategory from "../components/FilterCategory";
// import FilterColor from "../components/FIlterColor";
import FilterPrice from "../components/FilterPrice";
import FilterSize from "../components/FilterSize";
import axios from "axios";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

type FilterProps = {};

const Page = (props: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [allColorValues, setAllColorValues] = useState<string[]>([]);
  const [selectedAllColorValues, setSelectedAllColorValues] = useState<
    string[]
  >([]);
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [response, setResponse] = useState<any[]>([]);
  const [isFilterCategory, setIsFilterCategory] = useState<boolean>(false);
  const [isFilterColor, setIsFilterColor] = useState(false);
  const [isFilterPrice, setIsFilterPrice] = useState(false);
  const [isFilterSize, setIsFilterSize] = useState(false);

  const categoryModalRef = useRef<HTMLDivElement | null>(null);
  const colorModalRef = useRef<HTMLDivElement | null>(null);
  const priceModalRef = useRef<HTMLDivElement | null>(null);
  const sizeModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCategoryOutsideClick = (e: MouseEvent) => {
      if (
        categoryModalRef.current &&
        !categoryModalRef.current.contains(e.target as Node)
      ) {
        setIsFilterCategory(false);
      }
    };
    if (isFilterCategory) {
      document.addEventListener("mousedown", handleCategoryOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleCategoryOutsideClick);
    }

    const handleColorOutsideClick = (e: MouseEvent) => {
      if (
        colorModalRef.current &&
        !colorModalRef.current.contains(e.target as Node)
      ) {
        setIsFilterColor(false);
      }
    };
    if (isFilterColor) {
      document.addEventListener("mousedown", handleColorOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleColorOutsideClick);
    }

    const handlePriceOutsideClick = (e: MouseEvent) => {
      if (
        priceModalRef.current &&
        !priceModalRef.current.contains(e.target as Node)
      ) {
        setIsFilterPrice(false);
      }
    };
    if (isFilterPrice) {
      document.addEventListener("mousedown", handlePriceOutsideClick);
    } else {
      document.removeEventListener("mousedown", handlePriceOutsideClick);
    }

    const handleSizeOutsideClick = (e: MouseEvent) => {
      if (
        sizeModalRef.current &&
        !sizeModalRef.current.contains(e.target as Node)
      ) {
        setIsFilterSize(false);
      }
    };
    if (isFilterSize) {
      document.addEventListener("mousedown", handleSizeOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleSizeOutsideClick);
    }
  }, [isFilterCategory, isFilterColor, isFilterPrice, isFilterSize]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/filterproduct", {
          params: {
            categories: selectedCategories,
            size: selectedSize,
            price: {
              min: price.min,
              max: price.max,
            },
            colors: selectedAllColorValues,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setResponse(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedCategories, selectedSize, selectedAllColorValues, price]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="px-5 max-w-[1280px] mb-[100px] mx-auto">
      <div>
        <Navbar />
      </div>
      <hr />
      <div className="flex items-center sm:ml-28 mx-auto mt-10 relative">
        <div className="">
          <h1 className="py-3 mb-10 text-3xl font-medium">商品</h1>
          <div className="flex sm:flex-row flex-col">
            <div className="text-gray-600 ">絞り込み:</div>

            <div className="sm:ml-5 relative">
              <span
                className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline sm:my-0 my-2 sm:mr-0 mr-4"
                onClick={() => setIsFilterCategory(!isFilterCategory)}
              >
                カテゴリー
                <div className="ml-2">
                  <BiChevronDown />
                </div>
              </span>
              {isFilterCategory && (
                <div
                  className="modal absolute top-12 left-0 w-full"
                  ref={categoryModalRef}
                >
                  <div className="modal-content w-[450px] h-[245px] border-[1px] relative z-10 p-4 bg-white">
                    <FilterCategory
                      setIsFilterCategory={setIsFilterCategory}
                      isFilterCategory={isFilterCategory}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* <div className="ml-5 relative">
              <span
                className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline mb-2"
                onClick={() => {
                  setIsFilterColor(!isFilterColor);
                }}
              >
                カラー
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
              {isFilterColor && (
                <div
                  className="modal absolute top-12 left-0 w-full"
                  ref={colorModalRef}
                >
                  <div className="modal-content w-[550px] h-[345px] border-[1px] relative z-10 p-4 bg-white">
                    <FilterColor
                      setIsFilterColor={setIsFilterColor}
                      isFilterColor={isFilterColor}
                      allColorValues={allColorValues}
                      setAllColorValues={setAllColorValues}
                      selectedAllColorValues={selectedAllColorValues}
                      setSelectedAllColorValues={setSelectedAllColorValues}
                    />
                  </div>
                </div>
              )}
            </div> */}
            <div className="sm:ml-5 relative">
              <span
                className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline mb-2"
                ref={colorModalRef}
                onClick={() => {
                  setIsFilterPrice(!isFilterPrice);
                }}
              >
                価格
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
              {isFilterPrice && (
                <div
                  className="modal absolute top-12 left-0 w-full"
                  ref={priceModalRef}
                >
                  <div className="modal-content w-[380px] h-[155px] border-[1px] relative z-10 p-4 bg-white">
                    <FilterPrice
                      setIsFilterPrice={setIsFilterPrice}
                      isFilterPrice={isFilterPrice}
                      setPrice={setPrice}
                      price={price}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="sm:ml-5 relative">
              <span
                className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline mb-2"
                onClick={() => {
                  setIsFilterSize(!isFilterSize);
                }}
              >
                サイズ
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
              {isFilterSize && (
                <div
                  className="modal absolute top-12 left-0 w-full"
                  ref={sizeModalRef}
                >
                  <div className="modal-content w-[380px] h-[165px] border-[1px] relative z-10 p-4 bg-white">
                    <FilterSize
                      setIsFilterSize={setIsFilterSize}
                      isFilterSize={isFilterSize}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" max-w-full mb-10 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
              {response.map((product: any) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-md w-full sm:w-auto sm:mr-4 sm:mb-8 bg-white  sm:text-left text-center"
                >
                  <Link href={`/dashboard/${product.id}`}>
                    <div className="relative rounded-t-lg group">
                      <div
                        className="relative rounded-t-lg group sm:justify-normal justify-center "
                        style={{
                          width: "350px",
                          height: "220px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.images.split(",")[0]}
                          className="w-full h-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform"
                          alt=""
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h1 className="text-lg font-medium mb-2">
                        {product.title}
                      </h1>
                      <p className="text-sm text-gray-600">{product.store}</p>
                      <div className="flex items-center mt-2 sm:justify-normal justify-center">
                        <span className="text-xl font-medium text-[#31ACA3]">
                          ￥{formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
