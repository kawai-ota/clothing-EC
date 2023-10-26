import prisma from "@/app/lib/prismadb";
import getSession from "./getSession";

const getMyProduct = async () => {
  try {
    const session = await getSession();
    const allmyproduct = await prisma.product.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return allmyproduct;
  } catch (error: any) {
    return [];
  }
};

export default getMyProduct;
