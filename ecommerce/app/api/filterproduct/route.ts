import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const categories = searchParams.getAll("categories[]");
    const colors = searchParams.getAll("colors[]");
    let sizes = searchParams.getAll("size[]");
    const minPriceStr = searchParams.get("price[min]");
    const maxPriceStr = searchParams.get("price[max]");
    const minPrice = minPriceStr ? parseInt(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? parseInt(maxPriceStr) : undefined;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          ...categories.map((category) => ({
            category: {
              contains: category,
            },
          })),
          ...sizes.map((size) => ({
            size: {
              contains: size,
            },
          })),
          ...colors.map((color) => ({
            color: {
              contains: color,
            },
          })),
          {
            price: {
              gte: minPrice,
              lte: maxPrice,
            },
          },
        ],
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("商品の取得でエラーが起きました", error);
    return NextResponse.error();
  }
}
