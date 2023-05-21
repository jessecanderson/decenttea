import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name, lat, lng },
    method,
  } = req;

  switch (req.method) {
    // Get current restaurant by ID
    case "GET":
      try {
        const result = await getRequest(Number(id));
        res.status(200).json({ response: result });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
      break;
  }
}

async function getRequest(id: number) {
  try {
    const client = new PrismaClient();
    const result = await client.restaurants.findUnique({
      where: {
        id: id,
      },
      include: {
        geolocation: true,
        reviews: true,
        List: true,
      },
    });
    client.$disconnect();
    return result;
  } catch (error) {
    throw error;
  }
}
