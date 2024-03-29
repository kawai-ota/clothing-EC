import React from "react";
import Link from "next/link";
import getItem from "@/app/actions/getItem";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Item = async () => {
  const products = await getItem();

  if (products.length === 0) {
    return <div>販売している商品はありません</div>;
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="max-w-full mb-8 flex flex-col justify-center ml-10 mr-10">
      <h1 className="py-3 font-medium text-3xl mt-10 mb-10 text-center">
        商品
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow-md w-full sm:w-auto bg-white sm:ml-4 sm:mb-8  sm:text-left text-center"
          >
            <Link href={`/dashboard/${product.id}`}>
              <div className="relative rounded-t-lg group">
                <div style={{ height: "200px" }}>
                  <Image
                    src={product.images.split(",")[0]}
                    className="w-full h-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVB0Rw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0L5pSDwAEIwHOVKX3XQAAAABJRU5ErkJggg=="
                    width={250}
                    height={250}
                    quality={100}
                    style={{ transition: "0.3s" }}
                    alt="商品画像"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-lg font-medium mb-2">{product.title}</h1>
                <p className="text-sm text-gray-600">{product.store}</p>
                <div className="flex sm:justify-between justify-center items-center mt-2">
                  <span className="text-xl font-medium text-[#31ACA3] ">
                    ￥{formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
