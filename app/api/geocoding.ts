import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  response: {
    address: string;
    geolocation: {
      lat: string;
      lng: string;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const query = req.query;
  const { address } = query;

  const apiKey = process.env.GOOGLE_API_KEY;

  // TODO: This was temp removed to stop pinging the Google API
  // Need to add this back in at some point.
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  // );

  // const data = await response.json();
  // const lat = data.results[0].geometry.location.lat;
  // const lng = data.results[0].geometry.location.lng;

  res.status(200).json({
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
