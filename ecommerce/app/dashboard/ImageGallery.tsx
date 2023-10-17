"use client";
import React, { useState } from "react";
import Image from "next/image";

type ImageProps = {
  imageUrls: string;
};

const ImageGallery = ({ imageUrls }: ImageProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const urlArray = imageUrls.split(",");
  return (
    <div className="images grid grid-cols-7">
      <div className="all-images flex flex-col col-span-2 justify-center">
        {urlArray.map((url, index) => (
          <div key={index} className="image relative rounded-lg">
            <img
              onClick={() => setSelectedImage(index)}
              className={`w-[70px] h-[70px] rounded-lg mb-3 p-1 object-cover object-top cursor-pointer ${
                selectedImage === index
                  ? "border-[1px] border-[#3EBCB5]"
                  : "border-[1px] border-[#6ec0bc]"
              }`}
              src={url}
              alt={`Image${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="selected-image col-span-5">
        <img
          src={urlArray[selectedImage]}
          alt=""
          className="h-[600px] w-auto object-cover object-top"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
