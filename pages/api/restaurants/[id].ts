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

  switch (req.method) {
    // Get current restaurant by ID
    case "GET":
      try {
        const result = await getRequest(`${id}`);
        res.status(200).json({ response: result.rows });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
    // Create new Restaurant with ID
    case "POST":
      try {
        const result = await postRequset(`${id}`, `${name}`);
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

async function getRequest(id: string) {
  try {
    const client = await pool.connect();
    const query = `select * from "RestaurantSchema".restaurant where id=${id};`;
    const result = await client.query(query);
    console.log(result);
    client.release();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function postRequset(id: string, name: string) {
  try {
    const client = await pool.connect();
    const decodedName = decodeURI(name);
    const query = `INSERT INTO "RestaurantSchema".restaurant (id, name) VALUES ('${id}'::integer, '${decodedName}') returning id;`;
    const result = await client.query(query);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}
