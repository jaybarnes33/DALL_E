import { openAiConnect } from "@/lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { ImagesResponse } from "openai";
// type Data = {
//   images: { url: string }[];
// };

import { S3 } from "aws-sdk";

function uploadFilesToS3(data: ImagesResponse) {
  const aS3 = new S3({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_ACCESS_KEY!,
    },
  });

  return new Promise((resolve, reject) => {
    const s3FileLocations = [];

    (async () => {
      for (const item of data.data) {
        try {
          const buffer = Buffer.from(item.b64_json as string, "base64");
          const params = {
            Bucket: "setlinn",
            Key: `item-${Date.now()}.png`,
            Body: buffer,
          };
          const data = await aS3.upload(params).promise();
          s3FileLocations.push({ url: data.Location });
        } catch (err) {
          console.error(`Error uploading : ${err}`);
          reject(err);
          return;
        }
      }
      console.log("All files uploaded successfully");
      console.log(s3FileLocations);
      resolve(s3FileLocations);
    })();
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const openai = await openAiConnect();
      const { data } = await openai.createImage({
        prompt: req.body.prompt,
        n: 3,
        size: "512x512",
        response_format: "b64_json",
      });

      const urls = await uploadFilesToS3(data);
      res.status(200).json({ images: urls });
    }
  } catch (error) {
    console.log(error);
  }
}
