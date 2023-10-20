import React from "react";
import prisma from "@/app/lib/prismadb";
import Link from "next/link";
import Button from "./Button";
import DeleteCart from "./DeleteCart";

type AllCartProductProps = {
  userId?: number;
};

const AllCartProduct = async (props: AllCartProductProps) => {
  const allcartproduct = await prisma.cart.findMany({
    where: {
      userId: props.userId,
    },
  });

  const cartProductPromise = allcartproduct.map((cartProduct) =>
    prisma.product.findUnique({
      where: {
        id: cartProduct.productId,
      },
    })
  );

  const cartProducts = await Promise.all(cartProductPromise);

  const allIds = allcartproduct.map((item) => item.productId);

  if (cartProducts.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <img src="empty.png" alt="" />
        <h1 className="absolute top-[80%] text-2xl text-[#3EBCB5]">
          カートに商品が入っていません。
        </h1>
      </div>
    );
  }

  const formatPrice = (price: number | undefined) => {
    if (typeof price === "number") {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <div className="mt-14">
      {cartProducts.map((cartProduct) => (
        <>
          <div
            key={cartProduct?.id}
            className="flex justify-between w-8/12 mx-auto shadow-lg p-5 rounded-lg mt-6"
          >
            <div className="flex">
              <Link href={`/dashboard/${cartProduct?.id}`}>
                <img
                  src={cartProduct?.images.split(",")[0]}
                  className="w-[200px] h-[200px] object-cover object-top mr-10 rounded-lg"
                  alt=""
                />
              </Link>
              <div className="flex flex-col">
                <h1 className="text-2xl mb-3">{cartProduct?.title}</h1>
                <h2 className="mb-2 text-neutral-800 ">
                  ￥{formatPrice(cartProduct?.price)}
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
              </div>
            </div>
            <div className="mt-0">
              <DeleteCart productId={cartProduct?.id} userId={props.userId} />
            </div>
          </div>
        </>
      ))}
      <Button allIds={allIds} userId={props.userId} />
    </div>
  );
};

export default AllCartProduct;
