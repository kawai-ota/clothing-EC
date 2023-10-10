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
      {purchaseProducts.map((cartProduct) => (
        <div
          key={cartProduct?.id}
          className="flex items-center justify-between w-8/12 mx-auto shadow-lg p-5 rounded-lg mt-6"
        >
          <div>
            <h1 className="text-2xl mb-3">{cartProduct?.title}</h1>
            <h2 className="mb-2 text-neutral-800 ">
              値段:{cartProduct?.price}円
            </h2>
            <h3 className="text-sm text-neutral-600 mb-2">
              カテゴリー:{cartProduct?.category}
            </h3>
            <h3 className="text-sm text-neutral-600 mb-2">
              スタイル:{cartProduct?.style}
            </h3>
            <h3 className="text-sm text-neutral-600 mb-2">
              アパレル名:{cartProduct?.store}
            </h3>
            <p className="text-green-600">
              購入 <BsCheck2All size={20} className="text-green-600" />
            </p>
          </div>
          <Link href={`/dashboard/${cartProduct?.id}`}>
            <div>
              <img
                src={cartProduct?.images.split(",")[0]}
                className="w-[200px] h-[200px] object-cover object-top"
                alt=""
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllPurchased;
