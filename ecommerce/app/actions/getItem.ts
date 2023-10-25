import prisma from "@/app/lib/prismadb";

const getItem = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error: any) {
    return [];
  }
};

export default getItem;
