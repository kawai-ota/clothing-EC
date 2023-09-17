import React, { useEffect, useState } from "react";
import ColorPicker from "react-pick-color";
import { GrAdd } from "react-icons/gr";

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  Color: string;
}

const Color: React.FC<Props> = ({ setFormData, Color }) => {
  const [color, setColor] = useState("#fff");
  const [open, setOpen] = useState<boolean>(false);
  const colorArray: string[] = Color.split(",");
  const [selectedColors, setSelectedColors] = useState<string[]>(colorArray);

  if (colorArray.length < 0) {
    setSelectedColors([]);
  }

  const handleColorButtonClick = () => {
    setSelectedColors((prevSelectedColors) => [...prevSelectedColors, color]);
    setOpen(false);
  };

  useEffect(() => {
    const handleSelectedColors = () => {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        color: selectedColors.join("."),
      }));
    };
    handleSelectedColors();
  }, [selectedColors]);

  const handleDeleteColor = (indexToDelete: number) => {
    setSelectedColors((prevSelectedColors) => {
      const updateColors = [...prevSelectedColors];
      updateColors.splice(indexToDelete, 1);
      return updateColors;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-3">
        <button
          className="block border-[1px] rounded-lg px-3 text-[14px]"
          onClick={() => setOpen(!open)}
        >
          カラーを選択
        </button>
        {open && (
          <ColorPicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        )}
        <button
          className="flex items-center space-x-1 border-[1px] rounded-lg p-1 px-3 text-[14px]"
          onClick={handleColorButtonClick}
        >
          追加
          <GrAdd className="ml-1" size={16} />
        </button>
      </div>
      <div className="mt-5">
        {selectedColors.map((selectedColors, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                backgroundColor: selectedColors,
                display: "inline-block",
              }}
            ></div>
            <span className="border-[1px] rounded-lg p-1 px-3 text-[14px]">
              {selectedColors}
            </span>
            <button
              className="border-[1px] rounded-lg p-1 px-3 text-[14px]"
              onClick={() => handleDeleteColor(index)}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;
