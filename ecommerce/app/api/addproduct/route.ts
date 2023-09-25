import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    category,
    style,
    store,
    size,
    inventory,
    color,
    price,
    images,
    userId,
  } = body;

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        style,
        size,
        inventory,
        color,
        price,
        images,
        userId,
        store,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("Error creating the product", error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { productId, userId } = body;

  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: productId,
        userId: userId,
      },
    });
    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.log("商品の削除に失敗しました", error);
    return NextResponse.error();
  }
}
