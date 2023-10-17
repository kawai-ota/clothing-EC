import React from "react";

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
  return (
    <div>
      <div className="flex flex-col items-center space-x-5 mb-10">
        <div className="flex flex-row mb-5">
          <span className="w-[5px] h-[30px] bg-[#3EBCB5] rounded-full inline-block mr-5" />
          <span className="font-medium text-xl">スナップ</span>
        </div>
        <img
          src={props.images?.split(",").pop()}
          className="max-h-[300px] w-10/12 rounded-lg object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default Slide;
