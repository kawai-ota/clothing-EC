import React from "react";

type ImageProps = {
  info: any;
  updateInfo: React.Dispatch<React.SetStateAction<any>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<any>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageProps> = ({
  info,
  updateInfo,
  imageUrls,
  setImageUrls,
  handleImageChange,
}) => {
  return <div>ImageUpload</div>;
};

export default ImageUpload;
