export const LambdaTypes = {
  Create: '/members/create',
  GetAll: '/members',
  GetList: '/members/list',
  GetOne: '/members/get',
  InvitesCode: '/members/invites/code',
  InvitesCreate: '/members/invites/create',
  InvitesDelete: '/members/invites/delete',
  InvitesSend: '/members/invites/send',
  Invites: '/members/invites'
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
