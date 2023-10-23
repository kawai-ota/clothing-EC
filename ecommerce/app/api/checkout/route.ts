import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { productIds, userId } = await body;

  if (!productIds || productIds.length === 0) {
    return new NextResponse("商品が見つかりません", { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    take: 32000,
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "JPY",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price,
      },
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "auto",
    phone_number_collection: {
      enabled: false,
    },
    success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?cancelled=1`,
    metadata: {
      productIds: JSON.stringify(productIds),
      userId: userId,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeader });
}
