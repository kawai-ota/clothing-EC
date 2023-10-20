import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import prisma from "@/app/lib/prismadb";

type ItemProps = {};

const Item = async (props: ItemProps) => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (products.length === 0) {
    return <div>販売している商品はありません</div>;
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <h1 className="py-3 font-medium text-3xl ml-20 mt-10 mb-10">商品</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 ml-20">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/dashboard/${product.id}`}>
              <div className="relative rounded-lg group">
                <img
                  src={product.images.split(",")[0]}
                  className="w-[250px] h-[250px] object-cover object-top rounded-lg transform group-hover:translate-y-[-10px] transition-transform  border-2 border-transparent group-hover:border-[#31ACA3] transition-border duration-300"
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                    {product.title}
                  </h1>
                  <p className="text-[13px] opacity-60">{product.store}</p>
                </div>
                <span className="px-2 font-medium">
                  ￥{formatPrice(product.price)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
