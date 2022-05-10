export const LambdaTypes = {
  ChangeOwner: 'ChangeOwner',
  Create: 'Create',
  Delete: 'Delete',
  GetAll: 'GetAll',
  GetOne: 'GetOne'
};
export { handler } from './handler';
export { changeOwner } from './change-owner';
export { create } from './create';
export { deleteOne } from './delete';
export { getAll } from './get-all';
export { getOne } from './get-one';
