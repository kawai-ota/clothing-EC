import React from "react";
import getMyProduct from "../actions/getMyProduct";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { AiTwotoneEdit } from "react-icons/ai";
import Navbar from "../components/Navbar";
import DeleteProduct from "../components/DeleteProduct";

type MyBrandsProps = {};

export const dynamic = "force-dynamic";

const Page = async (props: MyBrandsProps) => {
  try {
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
              key={product?.id}
              className="flex flex-col sm:flex-row items-center w-full lg:w-[70%] mx-auto shadow-lg p-5 rounded-lg mt-6 relative"
            >
              <Link href={`/dashboard/${product?.id}`}>
                <img
                  src={product?.images.split(",")[0]}
                  className="w-[200px] h-[200px] object-cover object-top mb-4 sm:mb-0 rounded-lg"
                  alt=""
                />
              </Link>
              <div className="flex flex-col sm:flex-grow ml-0 sm:ml-10 text-center sm:text-left">
                <h1 className="text-2xl mb-3">{product.title}</h1>
                <h1 className="mb-3"> ￥{formatPrice(product.price)}</h1>
                <h1 className="mb-3"> カテゴリー:{product.category}</h1>
                <h1 className="mb-3"> スタイル:{product.style}</h1>
                <h1 className="mb-3"> アパレル名:{product.store}</h1>
                <div className="flex sm:justify-normal justify-center">
                  <DeleteProduct
                    productId={product.id}
                    userId={product.userId}
                  />
                </div>
              </div>
              {session?.user.id === product.userId && (
                <Link
                  className="absolute top-0 right-0"
                  href={`/edit/${product.id}`}
                >
                  <span className="absolute top-0 right-0 p-2 bg-[#31ACA3] hover:bg-[#42c9c3] rounded-full text-white cursor-pointer mr-2 mt-2">
                    <AiTwotoneEdit size={24} />
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>dbエラーです。</div>;
  }
};

export default Page;
