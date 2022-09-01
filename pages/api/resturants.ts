import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { lat, lng } = query;

  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=${lat},${lng}&radius=2000&region=us&type=restaurant&key=${apiKey}`;
  const headers = { "Content-Type": "application/json" };

  const response = await fetch(url, {
    headers: headers,
  });
  const data = await response.json();

  res.status(200).json(data.results);
}
