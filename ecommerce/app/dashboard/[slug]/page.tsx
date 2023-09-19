import React from "react";
import prisma from "@/app/lib/prismadb";
import ImageGallery from "../ImageGallery";
import Info from "../Info";
import Review from "@/app/components/Review";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

type Props = {};

export default async function Page({ params }: { params: { slug: string } }) {
  const productId = parseInt(params.slug, 10);
  const session = await getServerSession(options);
  const currentUserId = session?.user.id;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  //   const allReview = await prisma.findMany({
  //     where: {
  //       productId: productId,
  //     },
  //   });

  const urlString = product?.images;

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-5">
      <div className="font-semibold text-2xl mb-2">
        <a href="/">PAM</a>
      </div>
      <hr />
      {product && (
        <div className="grid grid-cols-2 mt-10 gap-14">
          {urlString && <ImageGallery imageUrls={urlString} />}
          <Info
            {...product}
            // rating={averageRating}
            // numberComments={allReview.length}
          />
        </div>
      )}
      <div className="mb-20 mt-20">
        <div className="flex items-center space-x-5 mb-10">
          <span className="w-[5px] h-[30px] bg-purple-600 rounded-full inline-block"></span>
          <span className="font-medium text-xl">商品説明</span>
        </div>
        {product && (
          <div className="grid grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-5 mb-5">
                <div className="">
                  <h3 className="font-medium">カテゴリー</h3>
                  <p className="text-sm">{product.category}</p>
                </div>
                <div className="">
                  <h3 className="font-medium">ファッション</h3>
                  <p className="text-sm">{product.style}</p>
                </div>
                <div className="">
                  <h3 className="font-medium">ブランド名</h3>
                  <p className="text-sm">{product.store}</p>
                </div>
              </div>
              <div
                style={{ borderColor: `{${product.color.split(",").pop()}}` }}
                className="leading-6 text-sm text-neutral-700 h-[200px] border-[1px] rounded-md p-4 overflow-scroll"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
            <div className="flex justify-end relative items-center">
              <img
                src={product.images.split(",").pop()}
                className="max-h-[300px] w-10/12 rounded-lg object-contain"
                alt=""
              />
              <span className="text-sm absolute bottom-2 right-2 text-white font-medium">
                {product.title}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-20 mb-20">
        <div className="flex items-center space-x-5 mb-10">
          <span className="w-[5px] h-[30px] bg-purple-600 rounded-full inline-block"></span>
          <span className="font-medium text-xl">コメント & レビュー</span>
        </div>
        <div className="grid grid-cols-2">
          <div></div>
          <Review productId={product?.id} userId={currentUserId} />
        </div>
      </div>
    </div>
  );
}
