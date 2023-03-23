import { openAiConnect } from "@/lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { ImagesResponse } from "openai";
type Data = {
  images: { url: string }[];
};

import { S3 } from "aws-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const aS3 = new S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_ACCESS_KEY!,
      },
    });

    if (req.method === "POST") {
      const openai = await openAiConnect();
      const { data } = await openai.createImage({
        prompt: req.body.prompt,
        n: 3,
        size: "512x512",
        response_format: "b64_json",
      });

      let urls: { url: string }[] = [];
      data.data.forEach((item, index) => {
        const buffer = Buffer.from(item.b64_json as string, "base64");
        const params = {
          Bucket: "setlinn",
          Key: `image-${Date.now()}.png`,
          Body: buffer,
        };
        aS3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
          if (err) {
            console.log(err);
          } else {
            urls.push({ url: data.Location });
          }
        });
      });

      res.status(200).json({ images: urls });
    }
  } catch (error) {
    console.log(error);
  }
}
