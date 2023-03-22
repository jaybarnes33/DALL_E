import { openAiConnect } from "@/lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { ImagesResponse } from "openai";
type Data = {
  images: ImagesResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "POST") {
      const openai = await openAiConnect();
      const { data } = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: "512x512",
      });
      res.status(200).json({ images: data });
    }
  } catch (error) {
    console.log(error);
  }
}
