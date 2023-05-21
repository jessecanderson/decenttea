import type { NextApiRequest, NextApiResponse } from "next";
import { List, PrismaClient } from "@prisma/client";

interface CreateList {
  name: string;
  userId: string;
  restaurantId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const listInfo: CreateList = body;

  console.log(`${listInfo.userId}, ${listInfo.name}`);

  if (req.method != "POST") {
    res.status(405).json({ response: "Method not allowed" });
  }

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
  client.$disconnect();
  res.status(200).json({
    response: {
      list: result,
    },
  });
}
