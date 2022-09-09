import type { NextApiRequest, NextApiResponse } from "next";
import { List, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const listInfo: List = body;

  console.log(`${listInfo.userId}, ${listInfo.name}`);

  if (req.method != "POST") {
    res.status(405).json({ response: "Method not allowed" });
  }

  const client = new PrismaClient();
  const result = await client.list.create({
    data: {
      name: listInfo.name,
      user: {
        connect: { id: listInfo.userId },
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
