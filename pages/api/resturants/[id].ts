import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req;

  console.log(`Id for request is: ${id}`);

  try {
    const client = await pool.connect();
    const query = `select * from resturants where id=${id};`;
    const result = await client.query(query);
    console.log(result);
    client.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: `${error}` });
  }
  res.status(200).json({ response: "success" });
}
