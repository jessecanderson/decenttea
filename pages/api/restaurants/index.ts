import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { lat, lng } = query;

  try {
    const client = await pool.connect();
    const query = 'select * from "RestaurantSchema".restaurant;';
    const result = await client.query(query);
    client.release();
    res.status(200).json({
      response: {
        count: result.rowCount,
        restaurants: result.rows,
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
