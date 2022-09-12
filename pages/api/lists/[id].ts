import type { NextApiRequest, NextApiResponse } from "next";
import { List, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, userId } = req.query;

  console.log(`list id = ${id}, user id = ${userId}`);

  switch (req.method) {
    case "GET":
      res.status(200).json({ response: "success" });
      break;
    case "PUT":
      res.status(200).json({ response: "adding to list" });
      break;
    default:
      res.status(405).json({ response: "Method not allowed" });
  }
}
