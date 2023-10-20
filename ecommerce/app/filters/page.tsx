"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterCategory from "../components/FilterCategory";
import FilterColor from "../components/FIlterColor";
import FilterPrice from "../components/FilterPrice";
import FilterSize from "../components/FilterSize";
import axios from "axios";
import Link from "next/link";
import Filter from "./Filter";
import { BiChevronDown } from "react-icons/bi";

type FilterProps = {};

const Page = (props: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [allHexValues, setAllHexValues] = useState<string[]>([]);
  const [selectedHexValues, setSelectedHexValues] = useState<string[]>([]);
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });
  // const [isChevronRotated, setIsChevronRotated] = useState(false);
  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("/api/filterproduct", {
            params: {
              categories: selectedCategories,
              size: selectedSize,
              price: {
                min: price.min,
                max: price.max,
              },
              colors: selectedHexValues,
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("response", response.data);
            setResponse(response.data);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedCategories, selectedSize, selectedHexValues, price]);

  const handleFilterCategory = () => {
    return <FilterCategory />;
  };

  const handleFilterColor = () => {
    return <FilterColor />;
  };

  const handleFilterPrice = () => {
    return <FilterPrice />;
  };

  const handleFilterSize = () => {
    return <FilterSize />;
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="px-5 max-w-[1280px] mb-[100px] mx-auto">
      <div>
        <Navbar />
        {/* {
              <Filter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                allHexValues={allHexValues}
                setAllHexValues={setAllHexValues}
                selectedHexValues={selectedHexValues}
                setSelectedAllHexValues={setSelectedHexValues}
                price={price}
                setPrice={setPrice}
              />
            } */}
      </div>
      <hr />
      <div className="flex items-center ml-28 mt-10 ">
        <div className="px-10">
          <h1 className="py-3 mb-10 text-3xl font-medium">商品</h1>
          <div className="flex flex-row">
            <div className="text-gray-600">絞り込み:</div>
            <div className="ml-5">
              <span
                className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline"
                onClick={handleFilterCategory}
              >
                カテゴリー
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
            </div>
            <div className="ml-5">
              <span className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline">
                カラー
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
            </div>
            <div className="ml-5">
              <span className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline">
                価格
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
            </div>
            <div className="ml-5">
              <span className="flex flex-row items-center text-gray-600 cursor-pointer hover:text-gray-900 hover:underline">
                サイズ
                <div className="ml-2">
                  <BiChevronDown className="transform" />
                </div>
              </span>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-8">
            {response.map((product: any) => (
              <div key={product.id}>
                <Link href={`/dashboard/${product.id}`}>
                  <div className="relative rounded-lg group">
                    <img
                      src={product.images.split(",")[0]}
                      className="w-[250px] h-[250px] object-cover object-top rounded-lg transform group-hover:translate-y-[-10px] transition-transform  border-2 border-transparent group-hover:border-[#31ACA3] transition-border duration-300"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4 group">
                    <div>
                      <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                        {product.title}
                      </h1>
                      <p className="text-[13px] opacity-60">{product.store}</p>
                    </div>
                    <span className="px-2 font-medium">
                      ￥{formatPrice(product.price)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
