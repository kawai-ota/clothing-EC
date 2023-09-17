"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Size from "../components/Size";
import Color from "../components/Color";
import Para from "../components/Para";
import ImageUpload from "../components/ImageUpload";

type Props = {};

const Productform = (props: Props) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: `<div>
    <p>
    商品説明の追加
    </p>
  </div>`,
    category: "",
    style: "",
    size: "",
    inventory: 0,
    color: "#fe345e",
    price: 0,
    images: "",
    userId: id,
    store: "",
  });

  const [Description, setDescription] = useState<string>("");
  const [info, setInfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
    console.log(formData.images);
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id,
    }));
  }, [imageUrls]);

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
            店舗
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
    </div>
  );
};

export default Productform;
