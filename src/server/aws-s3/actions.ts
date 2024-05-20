import {env} from "~/env";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY || "",
        secretAccessKey: env.S3_SECRET_KEY || "",
    },
});

export const uploadToS3 = async (
    file: File,name:string
)=> {
    const buffer =Buffer.from(await file.arrayBuffer());
    const uploadParams: any = {
        Bucket: env.S3_BUCKET_NAME,
        Key: name,
        Body: buffer,
        ContentType: "image/png",
        ACL: "public-read",
    };
    const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);

    return `https://${env.S3_BUCKET_NAME}.s3.${env.S3_BUCKET_REGION}.amazonaws.com/${name}`
}
