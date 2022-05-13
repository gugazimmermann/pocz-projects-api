export const LambdaTypes = {
  GetAll: 'GET /places',
  GetOne: 'GET /places/{id}',
  Count: 'GET /places/count',
  Create: 'POST /places',
  Update: 'PUT /places/{id}',
  Active: 'PUT /places/active/{id}',
  Employees: 'PUT /places/employees/{id}',
  Managers: 'PUT /places/managers/{id}',
  Delete: 'DELETE /places/{id}'
};
export { handler } from './handler';
export { active } from './active';
export { count } from './count';
export { create } from './create';
export { deleteOne } from './delete';
export { employees } from './employees';
export { getAll } from './get-all';
export { getOne } from './get-one';
export { managers } from './managers';
export { update } from './update';
