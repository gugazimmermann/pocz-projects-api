export const LambdaTypes = {
  ChangeOwner: 'PUT /persons',
  Create: 'POST /persons',
  Delete: 'DELETE /persons/{id}',
  GetAll: 'GET /persons/type/{type}',
  GetOne: 'GET /persons/{id}'
};
export { handler } from './handler';
export { changeOwner } from './change-owner';
export { create } from './create';
export { deleteOne } from './delete';
export { getAll } from './get-all';
export { getOne } from './get-one';
