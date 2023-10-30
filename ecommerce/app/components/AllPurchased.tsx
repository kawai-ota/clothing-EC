import React from "react";
import prisma from "@/app/lib/prismadb";
import Link from "next/link";
import { BsCheck2All } from "react-icons/bs";

type AllPurchasedProps = {
  userId: number;
};

const AllPurchased = async ({ userId }: AllPurchasedProps) => {
  const purchasedproduct = await prisma.purchased.findMany({
    where: {
      userId: userId,
    },
  });
  const cartProdcutPromises = purchasedproduct.map((purchaseProduct) =>
    prisma.product.findUnique({
      where: {
        id: purchaseProduct.productId,
      },
    })
  );

  const purchaseProducts = await Promise.all(cartProdcutPromises);

  return (
    <div className="mt-14">
      <div className="flex flex-col">
        <h1 className="text-2xl justify-center mx-auto">購入履歴</h1>
        {purchaseProducts.map((cartProduct) => (
          <div
            key={cartProduct?.id}
            className="flex items-center justify-between w-full mx-auto sm:w-8/12 shadow-lg p-5 rounded-lg mt-6"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-[200px] sm:h-[200px] mb-4 sm:mb-0">
                <Link href={`/dashboard/${cartProduct?.id}`}>
                  <img
                    className="w-full h-[200px] rounded-lg"
                    src={cartProduct?.images.split(",")[0]}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-grow ml-0 sm:ml-10 justify-center text-center sm:text-left">
                <h1 className="text-2xl mb-3">{cartProduct?.title}</h1>
                <h2 className="mb-3 text-neutral-800">
                  値段: {cartProduct?.price}円
                </h2>
                <h3 className="mb-3 text-sm text-neutral-600">
                  カテゴリー: {cartProduct?.category}
                </h3>
                <h3 className="mb-3 text-sm text-neutral-600">
                  スタイル: {cartProduct?.style}
                </h3>
                <h3 className="mb-3 text-sm text-neutral-600">
                  アパレル名: {cartProduct?.store}
                </h3>
              </div>
              <div className="flex sm:ml-[390px] ml-0">
                <p className="flex mx-auto sm:justify-left justify-center text-[#3EBCB5]">
                  <BsCheck2All size={20} className="text-[#3EBCB5]" />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPurchased;
