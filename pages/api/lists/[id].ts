import type { NextApiRequest, NextApiResponse } from "next";
import { List, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, restaurantId } = req.query;

  console.log(`list id = ${id}, user id = ${restaurantId}`);

  switch (req.method) {
    case "GET":
      const lists = await getListById();
      res.status(200).json({ response: lists });
      break;
    case "PUT":
      const result = await addToList();
      res.status(200).json({ response: result });
      break;
    default:
      res.status(405).json({ response: "Method not allowed" });
  }

  async function getListById() {
    try {
      const client = new PrismaClient();
      const result = await client.list.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          restaurants: true,
        },
      });
      client.$disconnect();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function addToList() {
    try {
      const client = new PrismaClient();
      const result = await client.list.update({
        where: {
          id: Number(id),
        },
        data: {
          restaurants: {
            connect: {
              id: Number(restaurantId),
            },
          },
        },
      });
      client.$disconnect();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
