export const LambdaTypes = {
  Create: '/companies/create',
  Delete: '/companies/delete',
  GetAll: '/companies',
  GetOne: '/companies/get'
};
export { handler } from './handler';
export { create } from './create';
export { deleteOne } from './delete';
export { getAll } from './get-all';
export { getOne } from './get-one';
