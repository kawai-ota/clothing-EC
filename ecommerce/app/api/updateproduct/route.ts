import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();

  const {
    id,
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
    const updateProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        id,
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
      },
    });
    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
