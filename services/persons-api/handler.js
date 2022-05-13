import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, changeOwner, create, deleteOne, getAll, getOne } from './index';

export const handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (event.routeKey === LambdaTypes.ChangeOwner) return await changeOwner(user.tenant, body);
  if (event.routeKey === LambdaTypes.Create) return await create(user.tenant, body);
  if (event.routeKey === LambdaTypes.Delete) return await deleteOne(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.GetAll) return await getAll(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.GetOne) return await getOne(user.tenant, event.pathParameters);
  return CreateResponse(500, { message: 'No Event Type!' });
};
