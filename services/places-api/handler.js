import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import {
  LambdaTypes,
  count,
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  active,
  managers,
  employees,
  clients,
  supliers,
  contacts
} from './index';

export const handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (event.routeKey === LambdaTypes.Count) return await count(user.tenant);
  if (event.routeKey === LambdaTypes.GetAll) return await getAll(user.tenant);
  if (event.routeKey === LambdaTypes.GetOne) return await getOne(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.Update) return await update(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Create) return await create(user.tenant, body);
  if (event.routeKey === LambdaTypes.Delete) return await deleteOne(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.Active) return await active(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Managers) return await managers(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Employees) return await employees(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Clients) return await clients(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Supliers) return await supliers(user.tenant, event.pathParameters, body);
  if (event.routeKey === LambdaTypes.Contacts) return await contacts(user.tenant, event.pathParameters, body);
  return CreateResponse(500, { message: 'No Event Type!' });
};
