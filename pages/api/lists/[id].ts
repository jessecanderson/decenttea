import type { NextApiRequest, NextApiResponse } from "next";
import { List, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  res.status(200).json({
    response: "success",
  });
}
