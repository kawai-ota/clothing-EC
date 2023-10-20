import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterColorProps = {
  isFilterColor: any;
  setIsFilterColor: any;
};

const FIlterColor = (props: FilterColorProps) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>FilterCategory</div>
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
    </>
  );
};

export default FIlterColor;
