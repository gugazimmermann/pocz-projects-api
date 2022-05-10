import connectToDatabase from "../../libs/connection";
import CreateResponse from "../../libs/response";

export async function healthCheck() {
  try {
    await connectToDatabase();
    return CreateResponse(200, {  message: `Connection successful. Stage: ${process.env.NODE_ENV}` });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: `Could not connect to the database. Stage: ${process.env.NODE_ENV}` });
  }
}
