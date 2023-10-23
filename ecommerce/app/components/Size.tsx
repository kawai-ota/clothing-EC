"use client";
import React, { useState } from "react";

interface ParaProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Size: React.FC<ParaProps> = ({ setFormData }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const handleSizeButtonClick = (size: string) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };

  const handleSubmit = () => {
    setFormData((prevSetFormData: FormData) => ({
      ...prevSetFormData,
      size: selectedSizes.join(","),
    }));
  };

  return (
    <div className="flex flex-row items-center mr-4">
      {sizes.map((size) => (
        <button
          key={size}
          className={`flex mt-2 mr-4 w-8 h-8 rounded-full border border-gray-500 items-center justify-center text-sm ${
            selectedSizes.includes(size)
              ? "bg-black text-white"
              : "bg-white text-gray-500"
          }`}
          onClick={() => handleSizeButtonClick(size)}
        >
          {size}
        </button>
      ))}
      <button className="mt-2" onClick={handleSubmit}>
        選択
      </button>
    </div>
  );
};

export default Size;
