import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  switch (req.method) {
    case "GET":
      try {
        const result = await getReviews(id as string);
        res.status(200).json({ response: result });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
      break;
    default:
      res.status(500).json({ response: "Method not allowed" });
  }

  async function getReviews(id: string) {
    try {
      const client = new PrismaClient();
      const result = await client.reviews.findMany({
        where: {
          restaurantId: Number(id),
        },
        include: {
          user: true,
        },
      });
      client.$disconnect();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
