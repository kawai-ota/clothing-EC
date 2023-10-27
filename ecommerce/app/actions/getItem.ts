import prisma from "@/app/lib/prismadb";

const getItem = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("取得した商品情報:", products);
    return products;
  } catch (error) {
    console.error("データベースからの取得中にエラーが発生しました:", error);
    return [];
  }
};

export default getItem;
