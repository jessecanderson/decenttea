import { NextRequest, NextResponse } from "next/server";
import { List, PrismaClient } from "@prisma/client";

export async function GET(req: Request, res: NextResponse) {
  const { id, restaurantId } = req.query;

  switch (req.method) {
    case "GET":
      const lists = await getListById();
      res.json({ response: lists });
      break;
    case "PUT":
      const updatedList = await addToList();
      res.status(200).json({ response: updatedList });
      break;
    case "DELETE":
      const removedList = await removeFromList();
      res.status(200).json({ response: removedList });
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

  async function removeFromList() {
    try {
      const client = new PrismaClient();
      const result = await client.list.update({
        where: {
          id: Number(id),
        },
        data: {
          restaurants: {
            disconnect: {
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
