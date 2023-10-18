"use client";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

type SlideTypeProps = {
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

const Slide = (props: SlideTypeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = props.images?.split(",") || [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="flex flex-col items-center space-x-5 mb-10">
        <div className="flex flex-row mb-5 lg:mt-0 mt-20">
          <span className="w-[5px] h-[30px] bg-[#3EBCB5] rounded-full inline-block mr-5" />
          <span className="font-medium text-xl">スナップ</span>
        </div>
        <img
          src={imageUrls[currentIndex]}
          className="max-h-[300px] w-10/12 rounded-lg object-contain"
          alt=""
        />
        <div className="flex justify-between w-10/12 mt-2">
          <div className="flex flex-row opacity-70">
            <button onClick={prevSlide} className="flex flex-row">
              <FiChevronLeft className="mr-2" size={24} />
              前へ
            </button>
          </div>
          <div className="opacity-70">
            <button onClick={nextSlide} className="flex flex-row">
              次へ
              <FiChevronRight size={24} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
