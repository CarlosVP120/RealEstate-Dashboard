import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { randomBytes } from "crypto";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

const region = "us-west-2";
const bucketName = "aws-webdemo-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const randomBytesAsync = promisify(randomBytes);

export async function generateUploadURL() {
  const rawBytes = await randomBytesAsync(16);
  const imageName = rawBytes.toString("hex") + ".png";

  const params = {
    Bucket: bucketName,
    Key: imageName,
    ContentType: "image/png",
  };

  const command = new PutObjectCommand(params);
  const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return uploadURL;
}
