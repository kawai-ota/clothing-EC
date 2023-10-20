import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterPriceProps = {
  setIsFilterPrice: any;
  isFilterPrice: any;
};

const FilterPrice = (props: FilterPriceProps) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>FilterCategory</div>
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
    </>
  );
};

export default FilterPrice;
