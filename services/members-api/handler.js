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
  const { path } = event.requestContext?.http;
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (path === LambdaTypes.Create) return await create(user.tenant, body.object);
  if (path === LambdaTypes.GetAll) return await getAll(user.tenant, user.id);
  if (path === LambdaTypes.GetList) return await getList(user.tenant, user.id);
  if (path === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.InvitesCode) return await invitesCode(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.InvitesCreate) return await invitesCreate(user.tenant, user.id, body.object);
  if (path === LambdaTypes.InvitesDelete) return await invitesDelete(user.tenant, event?.pathParameters);
  if (path === LambdaTypes.InvitesSend) return await invitesSend(user.tenant, user.id, event?.pathParameters);
  if (path === LambdaTypes.Invites) return await invites(user.tenant);
  return CreateResponse(500, { message: 'No Event Type!' });
};
