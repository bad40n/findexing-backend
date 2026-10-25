import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: process.env.DO_SPACE_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY || "",
  },
});

export const uploadBase64ToSpaces = async (
  base64Data: string,
  fileName: string,
  contentType: string = "image/jpeg"
): Promise<string> => {
  const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Content, "base64");
  const bucketName = process.env.DO_SPACE_BUCKET || "discountkothai";

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: contentType,
    ACL: "public-read",
  });

  await s3Client.send(command);

  const cdnUrl = process.env.DO_SPACE_CDN_URL;
  if (cdnUrl) {
    return `${cdnUrl}/${fileName}`;
  }

  const cleanEndpoint = process.env.DO_SPACE_ENDPOINT?.replace(/^https?:\/\//, "");
  return `https://${bucketName}.${cleanEndpoint}/${fileName}`;
};
