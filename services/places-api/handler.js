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
  const { path } = event.requestContext?.http;
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (path === LambdaTypes.Active) return await active(user.tenant, event?.pathParameters, body);
  if (path === LambdaTypes.Count) return await count(user.tenant);
  if (path === LambdaTypes.Create) return await create(user.tenant, body);
  if (path === LambdaTypes.Delete) return await deleteOne(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.Employees) return await employees(user.tenant, event?.pathParameters, body);
  if (path === LambdaTypes.GetAll) return await getAll(user.tenant);
  if (path === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.Managers) return await managers(user.tenant, event?.pathParameters, body);
  if (path === LambdaTypes.Update) return await update(user.tenant, event?.pathParameters, body);
  return CreateResponse(500, { message: 'No Event Type!' });
};
