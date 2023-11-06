"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterCategoryProps = {
  setIsFilterCategory: any;
  isFilterCategory: any;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
};

const FilterCategory = (props: FilterCategoryProps) => {
  const handleReset = () => {
    props.setSelectedCategories([]);
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-col">
          <div className="mb-1">カテゴリーを選択</div>
          <div className="flex justify-start">
            <button className="underline" onClick={handleReset}>
              リセット
            </button>
          </div>
        </div>
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
      <div className="py-3 pb-5 text-sm text-neutral-600 border-b-[0.5px]">
        <select
          multiple
          value={props.selectedCategories}
          onChange={(e) =>
            props.setSelectedCategories(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full h-32 p-2 border rounded-lg"
        >
          <option value="トップス" className="cursor-pointer hover:bg-gray-300">
            トップス
          </option>
          <option
            value="ジャケット/アウター"
            className="cursor-pointer hover:bg-gray-300"
          >
            ジャケット/アウター
          </option>
          <option value="ボトムス" className="cursor-pointer hover:bg-gray-300">
            ボトムス
          </option>
          <option
            value="ワンピース/ドレス"
            className="cursor-pointer hover:bg-gray-300"
          >
            ワンピース/ドレス
          </option>
          <option value="スカート" className="cursor-pointer hover:bg-gray-300">
            スカート
          </option>
          <option value="バッグ" className="cursor-pointer hover:bg-gray-300">
            バッグ
          </option>
          <option value="シューズ" className="cursor-pointer hover:bg-gray-300">
            シューズ
          </option>
          <option
            value="ステッカー"
            className="cursor-pointer hover:bg-gray-300"
          >
            ステッカー
          </option>
          <option
            value="財布/小物"
            className="cursor-pointer hover:bg-gray-300"
          >
            財布/小物
          </option>
          <option
            value="アクセサリー"
            className="cursor-pointer hover:bg-gray-300"
          >
            アクセサリー
          </option>
          <option value="下着" className="cursor-pointer hover:bg-gray-300">
            下着
          </option>
          <option value="靴下" className="cursor-pointer hover:bg-gray-300">
            靴下
          </option>
        </select>
      </div>
    </>
  );
};

export default FilterCategory;
