import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterPriceProps = {
  setIsFilterPrice: any;
  isFilterPrice: any;
  price: { min: any; max: any };
  setPrice: React.Dispatch<React.SetStateAction<{ min: any; max: any }>>;
};

const FilterPrice = (props: FilterPriceProps) => {
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
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>価格を選択</div>
        <button
          onClick={() => {
            props.setIsFilterPrice(!props.isFilterPrice);
          }}
        >
          <div className="flex flex-col items-center">
            <AiOutlineClose size={24} />
            <span className="text-sm">閉じる</span>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 px-5 overflow-hidden mt-2">
        <div className="flex flex-row items-center">
          <span className="left-3 top-1 mr-1">￥</span>
          <input
            className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
            type="number"
            name="min"
            onChange={handleMinChange}
            value={props.price.min}
            placeholder="から"
          />
        </div>
        <div className="flex flex-row items-center">
          <span className="left-3 top-1">￥</span>
          <input
            className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
            type="number"
            name="max"
            onChange={handleMaxChange}
            value={props.price.max}
            placeholder="まで"
          />
        </div>
      </div>
    </>
  );
};

export default FilterPrice;
