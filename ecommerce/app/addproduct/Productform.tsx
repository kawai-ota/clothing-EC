"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Size from "../components/Size";
import Color from "../components/Color";
import Para from "../components/Para";
import ImageUpload from "../components/ImageUpload";

type ProductFormProps = {};

const Productform = (props: ProductFormProps) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    style: "",
    size: "",
    inventory: 0,
    color: "#ffffff",
    price: 0,
    images: "",
    userId: id,
    store: "",
  });

  const [Description, setDescription] = useState<string>("");
  const [info, updateinfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      images: stringImages,
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

  const postData = async () => {
    handleImageChange();
    try {
      const response = await axios.post("/api/addproduct", formData);
      router.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
        <hr />
      </div>
      <h1 className="text-3xl font-semibold py-6">ブランドの出品</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <label htmlFor="title" className="font-medium">
            商品名
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category" className="font-medium">
            カテゴリー
          </label>
          <select
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">選択してください</option>
            <option
              value="トップス"
              className="cursor-pointer hover:bg-gray-300"
            >
              トップス
            </option>
            <option
              value="ジャケット/アウター"
              className="cursor-pointer hover:bg-gray-300"
            >
              ジャケット/アウター
            </option>
            <option
              value="ボトムス"
              className="cursor-pointer hover:bg-gray-300"
            >
              ボトムス
            </option>
            <option
              value="ワンピース/ドレス"
              className="cursor-pointer hover:bg-gray-300"
            >
              ワンピース/ドレス
            </option>
            <option
              value="スカート"
              className="cursor-pointer hover:bg-gray-300"
            >
              スカート
            </option>
            <option value="バッグ" className="cursor-pointer hover:bg-gray-300">
              バッグ
            </option>
            <option
              value="シューズ"
              className="cursor-pointer hover:bg-gray-300"
            >
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
        <div>
          <label htmlFor="style" className="font-medium">
            スタイル
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
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
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
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
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
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
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
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
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
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
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-[#3EBCB5] px-3 focus:border-2 outline-none"
              name="color"
              value={formData.color}
              onChange={handleChange}
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
        updateInfo={updateinfo}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        handleImageChange={handleImageChange}
      />
      <button
        onClick={postData}
        className="text-white mt-10 border-[1px] bg-[#3EBCB5] hover:bg-[#46cdc6] rounded-lg px-5 p-2"
      >
        登録
      </button>
    </div>
  );
};

export default Productform;
