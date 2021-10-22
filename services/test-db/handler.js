import connectToDatabase from "../../libs/connection";
import createResponse from "../../libs/response";

export async function healthCheck() {
  try {
    await connectToDatabase();
    return createResponse(200, {
      message: `Connection successful. Stage: ${process.env.NODE_ENV}`,
    });
  } catch (err) {
    return createResponse(err.statusCode || 500, {
      message: `Could not connect to the database. Stage: ${process.env.NODE_ENV}`,
    });
  }
}
