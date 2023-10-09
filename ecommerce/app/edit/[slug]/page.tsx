import React from "react";
import prisma from "@/app/lib/prismadb";
import Edit from "../Edit";

const page = async ({ params }: { params: { slug: string } }) => {
  const productId = parseInt(params.slug, 10);

  if (isNaN(productId)) {
    return <div>登録されていない商品番号です</div>;
  }
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return <div>この商品は登録されていません</div>;
    }

    return (
      <div>
        <Edit {...product} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>商品の取得中にエラーが起きました。もう一度やり直してください</div>
    );
  }
};

export default page;
