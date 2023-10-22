import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterColorProps = {
  isFilterColor: any;
  setIsFilterColor: any;
  allColorValues: string[];
  setAllColorValues: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAllColorValues: string[];
  setSelectedAllColorValues: React.Dispatch<React.SetStateAction<string[]>>;
};

const FIlterColor = (props: FilterColorProps) => {
  const toggleColor = (color: string) => {
    props.setSelectedAllColorValues((prevColor) =>
      prevColor.includes(color)
        ? prevColor.filter((c) => c !== color)
        : [...prevColor, color]
    );
  };

  const getAllColors = async () => {
    try {
      const response = await axios.get("/api/color", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  };

  useEffect(() => {
    getAllColors().then((allColors) => {
      if (allColors) {
        const ColorSet = new Set<string>();
        allColors.forEach((element: any) => {
          const colors = element.color.split(",");
          colors.forEach((color: string) => {
            const ColorValue = color.replace("#", "");
            ColorSet.add(ColorValue);
          });
        });
        const uniqueColorValues: string[] = Array.from(ColorSet);
        props.setAllColorValues(uniqueColorValues);
      }
    });
  }, []);

  const allColorValue = props.allColorValues;
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>カラーを選択</div>
        <button
          onClick={() => {
            props.setIsFilterColor(!props.isFilterColor);
          }}
        >
          <div className="flex flex-col items-center">
            <AiOutlineClose size={24} />
            <span className="text-sm">閉じる</span>
          </div>
        </button>
      </div>
      <div className="mt-4 ml-4">
        <ul className="grid grid-cols-5 px-5 gap-5 mb-4">
          {allColorValue.map((colorvalue, index) => (
            <li
              key={index}
              className={`w-12 h-12 rounded-full border-[1px]  cursor-pointer ${
                props.selectedAllColorValues.includes(`#${colorvalue}`)
                  ? "shadow-md opacity-75"
                  : ""
              }`}
              style={{ backgroundColor: `#${colorvalue}` }}
              onClick={() => toggleColor(`#${colorvalue}`)}
            ></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FIlterColor;
