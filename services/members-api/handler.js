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
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (body.type === LambdaTypes.Create) return await create(user.tenant, body.object);
  if (body.type === LambdaTypes.GetAll) return await getAll(user.tenant, user.id);
  if (body.type === LambdaTypes.GetList) return await getList(user.tenant, user.id);
  if (body.type === LambdaTypes.GetOne) return await getOne(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.InvitesCode) return await invitesCode(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.InvitesCreate) return await invitesCreate(user.tenant, user.id, body.object);
  if (body.type === LambdaTypes.InvitesDelete) return await invitesDelete(user.tenant, event?.pathParameters);
  if (body.type === LambdaTypes.InvitesSend) return await invitesSend(user.tenant, user.id, event?.pathParameters);
  if (body.type === LambdaTypes.Invites) return await invites(user.tenant);
  return CreateResponse(500, { message: 'No Event Type!' });
};
