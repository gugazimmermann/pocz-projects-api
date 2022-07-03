import { SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: process.env.REGION });

export  { sesClient };
