import React from "react";
import getMyProduct from "../api/myproduct/route";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { AiTwotoneEdit } from "react-icons/ai";
import Navbar from "../components/Navbar";
import DeleteProduct from "../components/DeleteProduct";

type MyBrandsProps = {};

const Page = async (props: MyBrandsProps) => {
  const session = await getServerSession(options);
  const allmyproduct = await getMyProduct();
  if (allmyproduct.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <h1 className="absolute top-[80%] text-2xl text-[#3EBCB5]">
          出品している商品はありません。
        </h1>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-20">
      <Navbar />
      <hr />
      <div>
        {allmyproduct.map((product) => (
          <div
            key={product.id}
            className="relative shadow-lg p-5 rounded-lg mt-10 sm:w-8/12 mx-auto"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-[200px] sm:h-[200px] mb-4 sm:mb-0">
                <Link href={`/dashboard/${product.id}`}>
                  <img
                    className="w-full h-[200px]  rounded-lg"
                    src={product.images.split(",")[0]}
                  />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-grow ml-0 sm:ml-10 justify-center">
                <h1 className="text-2xl mb-3">{product.title}</h1>
                <h1 className="mb-3"> ￥{formatPrice(product.price)}</h1>
                <h1 className="mb-3"> カテゴリー:{product.category}</h1>
                <h1 className="mb-3"> スタイル:{product.style}</h1>
                <h1 className="mb-3"> アパレル名:{product.store}</h1>
                <DeleteProduct productId={product.id} userId={product.userId} />
              </div>
            </div>

            {session?.user.id === product.userId && (
              <Link
                className="absolute top-0 right-0"
                href={`/edit/${product.id}`}
              >
                <span className="absolute top-0 right-0 p-2 bg-[#31ACA3] rounded-full text-white cursor-pointer mr-2 mt-2">
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

export default Page;
