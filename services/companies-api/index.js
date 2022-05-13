export const LambdaTypes = {
  Create: 'POST /companies',
  Delete: 'DELETE /companies/{id}',
  GetAll: 'GET /companies',
  GetOne: 'GET /companies/{id}'
};
export { handler } from './handler';
export { create } from './create';
export { deleteOne } from './delete';
export { getAll } from './get-all';
export { getOne } from './get-one';
