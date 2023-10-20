import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterCategoryProps = {
  setIsFilterCategory: any;
  isFilterCategory: any;
};

const FilterCategory = (props: FilterCategoryProps) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>FilterCategory</div>
        <button
          onClick={() => {
            props.setIsFilterCategory(!props.isFilterCategory);
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

export default FilterCategory;
