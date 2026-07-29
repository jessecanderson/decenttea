import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const client = new PrismaClient();

  try {
    const list = await client.list.findUnique({
      where: { id: Number(id) },
      include: { restaurants: true },
    });
    return NextResponse.json({ response: list });
  } finally {
    await client.$disconnect();
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  return updateRestaurants(req, params, "connect");
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  return updateRestaurants(req, params, "disconnect");
}

async function updateRestaurants(
  req: NextRequest,
  params: RouteContext["params"],
  action: "connect" | "disconnect"
) {
  const { id } = await params;
  const restaurantId = req.nextUrl.searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { response: "restaurantId is required" },
      { status: 400 }
    );
  }

  const client = new PrismaClient();
  try {
    const list = await client.list.update({
      where: { id: Number(id) },
      data: {
        restaurants: {
          [action]: { id: Number(restaurantId) },
        },
      },
    });
    return NextResponse.json({ response: list });
  } finally {
    await client.$disconnect();
  }
}
