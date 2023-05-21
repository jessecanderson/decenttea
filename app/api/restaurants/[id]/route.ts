import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(`id: ${id}`);

  try {
    const result = await getRequest(Number(id));
    NextResponse.json({ response: result }, { status: 200 });
  } catch (error) {
    NextResponse.json({ response: `${error}` }, { status: 500 });
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
