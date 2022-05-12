import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, get, update } from './index';

export const handler = async (event) => {
  const { path } = event.requestContext?.http;
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (path === LambdaTypes.Get) return await get(user);
  if (path === LambdaTypes.Update) return await update(user.id, body);
  return CreateResponse(500, { message: 'No Event Type!' });
};
