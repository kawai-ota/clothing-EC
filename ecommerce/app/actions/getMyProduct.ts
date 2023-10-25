import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const getMyProduct = async () => {
  try {
    const session = await getServerSession(options);
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
