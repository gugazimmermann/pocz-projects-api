import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, changeOwner, create, deleteOne, getAll, getOne } from './index';

export const handler = async (event) => {
  const { path } = event.requestContext?.http;
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (path === LambdaTypes.ChangeOwner) return await changeOwner(user.tenant, body);
  if (path === LambdaTypes.Create) return await create(user.tenant, body);
  if (path === LambdaTypes.Delete) return await deleteOne(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.GetAll) return await getAll(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  return CreateResponse(500, { message: 'No Event Type!' });
};
