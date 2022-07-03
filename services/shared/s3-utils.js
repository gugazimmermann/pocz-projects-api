import { S3Client, HeadObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export async function deleteFromBucket(fileName) {
  const commandInput = {
    Bucket: process.env.PROJECT_AVATAR_BUCKET,
    Key: fileName
  };
  const client = new S3Client({ region: process.env.REGION });
  try {
    await client.send(new HeadObjectCommand(commandInput));
  } catch (error) {
    console.log("HeadObjectCommand Error", error);
  }
  try {
    await client.send(new DeleteObjectCommand(commandInput));
  } catch (error) {
    console.log("DeleteObjectCommand Error", error);
  }
}

export async function sendToBucket(fileName, file) {
  try {
    const client = new S3Client({ region: process.env.REGION });
    return await client.send(new PutObjectCommand({
      Bucket: process.env.PROJECT_AVATAR_BUCKET,
      Key: fileName,
      Body: file
    }));
  } catch (error) {
    console.log("DeleteObjectCommand Error", error);
    return null;
  }
}
