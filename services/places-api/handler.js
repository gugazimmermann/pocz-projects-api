import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { 
  LambdaTypes,
  active,
  count,
  create,
  deleteOne,
  employees,
  getAll,
  getOne,
  managers,
  update
} from './index';

export const handler = async (event) => {
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (body.type === LambdaTypes.Active) return await active(user.tenant, event?.pathParameters, body.object);
  if (body.type === LambdaTypes.Count) return await count(user.tenant);
  if (body.type === LambdaTypes.Create) return await create(user.tenant, body.object);
  if (body.type === LambdaTypes.Delete) return await deleteOne(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.Employees) return await employees(user.tenant, event?.pathParameters, body.object);
  if (body.type === LambdaTypes.GetAll) return await getAll(user.tenant);
  if (body.type === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.Managers) return await managers(user.tenant, event?.pathParameters, body.object);
  if (body.type === LambdaTypes.Update) return await update(user.tenant, event?.pathParameters, body.object);
  return CreateResponse(500, { message: 'No Event Type!' });
};
