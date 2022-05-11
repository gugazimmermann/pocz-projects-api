export const LambdaTypes = {
  ChangeOwner: '/persons/change-owner',
  Create: '/persons/create',
  Delete: '/persons/delete',
  GetAll: '/persons',
  GetOne: '/persons/get'
};
export { handler } from './handler';
export { changeOwner } from './change-owner';
export { create } from './create';
export { deleteOne } from './delete';
export { getAll } from './get-all';
export { getOne } from './get-one';
