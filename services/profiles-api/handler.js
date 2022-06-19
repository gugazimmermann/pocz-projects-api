import parser from 'lambda-multipart-parser';
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, get, update } from "./index";

export const handler = async (event) => {
  const user = await DecodedId(event);
  if (user instanceof Error)
    return CreateResponse(user.statusCode, { message: user.message });
  if (event.routeKey === LambdaTypes.Get) return await get(user);
  if (event.routeKey === LambdaTypes.Update) {
    const body = await parser.parse(event);
    return await update(user.id, user.tenant, body);
  }
  return CreateResponse(500, { message: "No Event Type!" });
};
