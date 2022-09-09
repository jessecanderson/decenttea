import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  switch (req.method) {
    case "GET":
      try {
        const result = await getRequest(query);
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
    // Create new Restaurant with ID
    case "POST":
      try {
        const result = await postRequset(query);
        res.status(200).json({
          response: {
            restaurant: result,
          },
        });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }

    // const apiKey = process.env.GOOGLE_API_KEY;

    // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=${lat},${lng}&radius=2000&region=us&type=restaurant&key=${apiKey}`;
    // const headers = { "Content-Type": "application/json" };

    // const response = await fetch(url, {
    //   headers: headers,
    // });
    // const data = await response.json();

    // res.status(200).json(data.results);
  }

  async function getRequest(
    query: Partial<{ [key: string]: string | string[] }>
  ) {
    const { lat, lng } = query;
    try {
      const client = new PrismaClient();
      const result = await client.restaurants.findMany();
      client.$disconnect();
      res.status(200).json({
        response: {
          count: result.length,
          restaurants: result,
        },
      });
    } catch (error) {
      res.status(500).json({ response: `${error}` });
    }
  }

  async function postRequset(
    query: Partial<{ [key: string]: string | string[] }>
  ) {
    const { name, lat, lng } = query;
    try {
      const client = new PrismaClient();
      const decodedName = decodeURI(name as string);

      console.log(`${lat}, ${lng}`);
      const result = await client.restaurants.create({
        data: {
          name: decodedName,
        },
      });
      client.$disconnect;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
