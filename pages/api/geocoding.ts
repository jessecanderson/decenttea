import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  response: {
    address: string,
    geolocation: {
      lat: string,
      lng: string
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const query = req.query;
  const { address } = query;

  const apiKey = process.env.GOOGLE_API_KEY;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  );

  const data = await response.json();
  console.log(data);
  const lat = data.results[0].geometry.location.lat;
  const lng = data.results[0].geometry.location.lng;
  res.status(200).json({
    response: {
      address: `${address}`,
      geolocation: { lat: `${lat}`, lng: `${lng}` },
    },
  });
}
