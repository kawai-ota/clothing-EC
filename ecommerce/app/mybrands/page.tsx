import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import prisma from "@/app/lib/prismadb";
import { AiTwotoneEdit } from "react-icons/ai";
import Navbar from "../components/Navbar";
import DeleteProduct from "../components/DeleteProduct";

type MyBrandsProps = {};

const page = async (props: MyBrandsProps) => {
  const session = await getServerSession(options);

  const allmyproduct = await prisma.product.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  if (allmyproduct.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <img src="empty.png" alt="" />
        <h1 className="absolute top-[80%] text-2xl text-[#3EBCB5]">
          出品している商品はありません。
        </h1>
      </div>
    );
  }
  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
      <hr />
      <div>
        {allmyproduct.map((product) => (
          <div
            key={product.id}
            className="relative flex items-center justify-between w-8/12 px-6 mx-auto shadow-lg  p-5 rounded-lg mt-10"
          >
            <div>
              <h1 className="mb-3">{product.title}</h1>
              <h1 className="mb-3"> 値段:{product.price}円</h1>
              <h1 className="mb-3"> カテゴリー:{product.category}</h1>
              <h1 className="mb-3"> スタイル:{product.style}</h1>
              <h1 className="mb-3"> アパレル名:{product.store}</h1>
              <DeleteProduct productId={product.id} userId={product.userId} />
            </div>
            <Link href={`/dashboard/${product.id}`}>
              <div>
                <img
                  className="w-[200px] h-[200px] object-cover object-top"
                  src={product.images.split(",")[0]}
                  alt=""
                />
              </div>
            </Link>
            {session?.user.id === product.userId && (
              <Link
                className="absolute top-0 right-0"
                href={`/edit/${product.id}`}
              >
                <span className="absolute top-0 right-0 p-2 bg-green-600 rounded-full text-white cursor-pointer">
                  <AiTwotoneEdit size={24} />
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
