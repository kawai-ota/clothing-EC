import prisma from "@/app/lib/prismadb";

const getItem = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    console.error("データベースからの取得中にエラーが発生しました:", error);
    return [];
  }
};

export default getItem;
