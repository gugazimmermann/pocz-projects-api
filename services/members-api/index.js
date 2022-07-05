export const LambdaTypes = {
  Create: 'POST /members',
  GetAll: 'GET /members',
  GetList: 'GET /members/list',
  GetOne: 'GET /members/{id}',
  InvitesCode: 'GET /members/invites/code/{tenantId}/{code}',
  InvitesCreate: 'POST /members/invites',
  InvitesDelete: 'DELETE /members/invites/{id}',
  InvitesSend: 'GET /members/invites/{id}',
  Invites: 'GET /members/invites'
};
export { handler } from './handler';
export { create } from './create';
export { getAll } from './get-all';
export { getList } from './get-list';
export { getOne } from './get-one';
export { invitesCode } from './invites-code';
export { invitesCreate } from './invites-create';
export { invitesDelete } from './invites-delete';
export { invitesSend } from './invites-send';
export { invites } from './invites';
