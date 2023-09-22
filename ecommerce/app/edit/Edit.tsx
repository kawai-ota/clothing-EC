"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Size from "../components/Size";
import Color from "../components/Color";
import Para from "../components/Para";
import ImageUpload from "../components/ImageUpload";

type EditProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  style: string;
  store: string;
  size: string;
  inventory: number;
  color: string;
  price: number;
  images: string;
  userId: number;
};

const Edit = ({
  id,
  title,
  description,
  category,
  style,
  store,
  size,
  inventory,
  color,
  price,
  images,
  userId,
}: EditProps) => {
  const Id = userId;
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    description: description,
    category: category,
    style: style,
    store: store,
    size: size,
    inventory: inventory,
    color: color,
    price: price,
    images: images,
    userId: userId,
  });

  const [Description, setDescription] = useState<string>("");
  const [info, setInfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (formData.images) {
      const imageUrlArray = formData.images.split(",");
      setImageUrls(imageUrlArray);
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    const inventory =
      e.target.name === "inventory"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
      [e.target.name]: inventory,
    });
  };

  const handleImageChange = () => {
    const stringImages = JSON.stringify(imageUrls);
    setFormData({
      ...formData,
      description: Description,
      userId: id,
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id,
    }));
  }, [imageUrls]);

  const updateDate = async () => {
    handleImageChange();
    try {
      const response = await axios.post("/api/updateproduct", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
      </div>
      <h1 className="text-3xl font-semibold py-6">ブランドの出品</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <label htmlFor="title" className="font-medium">
            商品名
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category" className="font-medium">
            カテゴリー
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="style" className="font-medium">
            スタイル
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="style"
            value={formData.style}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="store" className="font-medium">
            ブランド名
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="store"
            value={formData.store}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="size" className="font-medium">
            サイズ
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
          <Size setFormData={setFormData} />
        </div>
        <div>
          <label htmlFor="inventory" className="font-medium">
            在庫
          </label>
          <input
            type="number"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="inventory"
            value={formData.inventory}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="font-medium">
            値段
          </label>
          <input
            type="number"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="color" className="font-medium">
              カラー
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="color"
              value={formData.color}
              onChange={handlePriceChange}
            />
          </div>
          <Color setFormData={setFormData} Color={formData.color} />
        </div>
      </div>
      <label htmlFor="" className="mt-10 inline-block font-medium">
        商品説明を追加
      </label>
      <Para
        setDescription={setDescription}
        description={formData.description}
      />
      <label htmlFor="" className="mt-10 inline-block font-medium">
        商品画像の追加
      </label>
      <ImageUpload
        info={info}
        updateInfo={setInfo}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        handleImageChange={handleImageChange}
      />
      <button
        onClick={updateDate}
        className="text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2"
      >
        編集
      </button>
    </div>
  );
};

export default Edit;
