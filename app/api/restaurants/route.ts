import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  try {
    return await getRequest();
  } catch (error) {
    NextResponse.json({ response: `${error}` });
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

async function getRequest() {
  // query: Partial<{ [key: string]: string | string[] }>
  try {
    const client = new PrismaClient();
    const result = await client.restaurants.findMany({
      include: {
        geolocation: true,
      },
    });
    client.$disconnect();
    debugger;
    return NextResponse.json({
      response: {
        count: result.length,
        restaurants: result,
      },
    });
  } catch (error) {
    return NextResponse.json({ response: `${error}` });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  try {
    const result = await postRequset();
    return NextResponse.json({
      response: {
        restaurant: result,
      },
    });
  } catch (error) {
    return NextResponse.json({ response: `${error}` });
  }

  async function postRequset() {
    // query: Partial<{ [key: string]: string | string[] }>
    // const { name, lat, lng } = query;
    try {
      const client = new PrismaClient();
      const decodedName = decodeURI(name as string);

      const result = await client.restaurants.create({
        data: {
          name: decodedName,
          geolocation: {
            create: {
              lat: Number(lat),
              lng: Number(lng),
            },
          },
        },
      });
      client.$disconnect;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
