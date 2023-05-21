import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  response: {
    address: string;
    geolocation: {
      lat: string;
      lng: string;
    };
  };
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl;
  const address = searchParams.get("address");

  const apiKey = process.env.GOOGLE_API_KEY;

  // TODO: This was temp removed to stop pinging the Google API
  // Need to add this back in at some point.
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  // );

  // const data = await response.json();
  // const lat = data.results[0].geometry.location.lat;
  // const lng = data.results[0].geometry.location.lng;

  return NextResponse.json({
    response: {
      address: `${address}`,
      geolocation: {
        lat: "30.466380",
        lng: "84.297150",
      },
      // geolocation: { lat: `${lat}`, lng: `${lng}` },
    },
  });
}
