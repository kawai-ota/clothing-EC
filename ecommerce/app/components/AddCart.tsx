"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

type AddProps = {
  productId?: number;
};

const AddCart = ({ productId }: AddProps) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();

  const handleCart = async () => {
    if (session?.user) {
      try {
        const response = axios
          .post("/api/cart", {
            productId: productId,
            userId: id,
          })
          .then((response) => {
            router.push("/cart");
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/signin");
    }
  };
  return (
    <div
      onClick={handleCart}
      className="flex items-center space-x-4 bg-[#3EBCB5] hover:bg-[#42c9c3] text-white px-6 p-2 rounded-full cursor-pointer"
    >
      <span>
        <CiShoppingCart size={24} />
      </span>
      <span className="text-wm]">カートに追加する</span>
    </div>
  );
};

export default AddCart;
