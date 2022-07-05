import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import {
  LambdaTypes,
  create,
  getAll,
  getList,
  getOne,
  invitesCode,
  invitesCreate,
  invitesDelete,
  invitesSend,
  invites
} from './index';

export const handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  if (event.routeKey === LambdaTypes.InvitesCode) return await invitesCode(event.pathParameters);
  if (event.routeKey === LambdaTypes.Create) return await create(body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (event.routeKey === LambdaTypes.GetAll) return await getAll(user.tenant, user.id);
  if (event.routeKey === LambdaTypes.GetList) return await getList(user.tenant, user.id);
  if (event.routeKey === LambdaTypes.GetOne) return await getOne(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.InvitesCreate) return await invitesCreate(user.tenant, user.id, body);
  if (event.routeKey === LambdaTypes.InvitesDelete) return await invitesDelete(user.tenant, event.pathParameters);
  if (event.routeKey === LambdaTypes.InvitesSend) return await invitesSend(user.tenant, user.id, event.pathParameters);
  if (event.routeKey === LambdaTypes.Invites) return await invites(user.tenant);
  return CreateResponse(500, { message: 'No Event Type!' });
};
