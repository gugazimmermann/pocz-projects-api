import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, changeOwner, create, deleteOne, getAll, getOne } from './index';

export const handler = async (event) => {
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (body.type === LambdaTypes.ChangeOwner) return await changeOwner(user.tenant, body.object);
  if (body.type === LambdaTypes.Create) return await create(user.tenant, body.object);
  if (body.type === LambdaTypes.Delete) return await deleteOne(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.GetAll) return await getAll(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  return CreateResponse(500, { message: 'No Event Type!' });
};
