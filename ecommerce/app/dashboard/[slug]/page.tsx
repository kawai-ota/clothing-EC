import React from "react";
import prisma from "@/app/lib/prismadb";
import ImageGallery from "../ImageGallery";
import Info from "../Info";

type Props = {};

export default async function Page({ params }: { params: { slug: string } }) {
  const productId = parseInt(params.slug, 10);
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
        </div>
      )}
      <Info
        {...product}
        // rating={averageRating}
        // numberComments={allReview.length}
      />
    </div>
  );
}
