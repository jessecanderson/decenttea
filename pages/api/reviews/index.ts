import { PrismaClient, Reviews } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  switch (req.method) {
    case "POST":
      try {
        const review: Reviews = body;
        console.log(review);
        const result = await addReview(review);
        res.status(200).json({ response: result });
      } catch (error) {
        res.status(500).json({ response: `${error}` });
      }
      break;
  }

  async function addReview(review: any) {
    try {
      const client = new PrismaClient();
      const result = await client.reviews.create({
        data: {
          restaurantId: review.restaurantId,
          userId: review.userId,
          rating: review.rating,
          comment: review.comment,
        },
      });
      client.$disconnect();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
