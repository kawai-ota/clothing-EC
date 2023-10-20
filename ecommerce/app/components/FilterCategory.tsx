import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type FilterCategoryProps = {
  setIsFilterCategory: any;
  isFilterCategory: any;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
};

const FilterCategory = (props: FilterCategoryProps) => {
  const toggleCategory = (category: string) => {
    props.setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-2">
        <div>カテゴリーを選択</div>
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
          <option value="トップス">トップス</option>
          <option value="ジャケット/アウター">ジャケット/アウター</option>
          <option value="ボトムス">ボトムス</option>
          <option value="ワンピース/ドレス">ワンピース/ドレス</option>
          <option value="スカート">スカート</option>
          <option value="バッグ">バッグ</option>
          <option value="シューズ">シューズ</option>
          <option value="ステッカー">ステッカー</option>
        </select>
      </div>
    </>
  );
};

export default FilterCategory;
