import React, { useState } from "react";

interface ParaProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Size: React.FC<ParaProps> = ({ setFormData }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ["S", "M", "L", "XL", "2XL"];

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
    <div>
      {sizes.map((size) => (
        <button
          key={size}
          className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer px-3 mt-4 mb-5 mr-5
     ${selectedSizes.includes(size) ? "bg-gray-500 text-white" : ""}`}
          onClick={() => handleSizeButtonClick(size)}
        >
          {size}
        </button>
      ))}
      <button onClick={handleSubmit}>選択</button>
    </div>
  );
};

export default Size;
