import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface CreateList {
  name: string;
  userId: string;
  restaurantId: number;
}

export async function POST(req: NextRequest) {
  const listInfo = (await req.json()) as CreateList;

  const client = new PrismaClient();
  const result = await client.list.create({
    data: {
      name: listInfo.name,
      userId: listInfo.userId,
      restaurants: {
        connect: {
          id: Number(listInfo.restaurantId),
        },
      },
    },
  });
  await client.$disconnect();
  return NextResponse.json({
    response: {
      list: result,
    },
  }, { status: 200 });
}
