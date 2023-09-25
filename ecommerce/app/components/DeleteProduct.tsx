"use client";
import React from "react";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { useRouter } from "next/navigation";

type DeleteProductProps = {
  productId?: number;
  userId?: number;
};

const DeleteProduct = ({ productId, userId }: DeleteProductProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete("/api/addproduct", {
        data: {
          productId: productId,
          userId: userId,
        },
      });
      router.refresh();
    } catch (error) {
      console.log("プロダクトの削除中にエラーが出ました", error);
    }
  };
  return (
    <div className="cursor-pointer" onClick={handleDelete}>
      <GoTrash className="text-red-600" size={20} />
    </div>
  );
};

export default DeleteProduct;
