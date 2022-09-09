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
    // Create new Restaurant with ID
    case "POST":
      try {
        const result = await postRequset(
          `${id}`,
          `${name}`,
          `${lat}`,
          `${lng}`
        );
        res.status(200).json({
          response: {
            restaurant: result.fields,
          },
        });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
  }

  //   res.status(200).json({ response: "success" });
}

async function getRequest(id: number) {
  try {
    const client = new PrismaClient();
    const result = await client.restaurants.findUnique({
      where: {
        id: id,
      },
    });
    console.log(result);
    client.$disconnect();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function postRequset(id: string, name: string, lat: string, lng: string) {
  try {
    const client = new PrismaClient();
    const decodedName = decodeURI(name);

    console.log(`${lat}, ${lng}`);
    const result = await client.restaurants.create({
      data: {
        id: Number(id),
        name: decodedName,
      },
    });
    client.$disconnect;
    return result;
  } catch (error) {
    throw error;
  }
}
