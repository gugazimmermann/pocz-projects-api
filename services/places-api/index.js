export const LambdaTypes = {
  Count: 'GET /places/count',
  GetAll: 'GET /places',
  GetOne: 'GET /places/{id}',
  Create: 'POST /places',
  Update: 'PUT /places/{id}',
  Delete: 'DELETE /places/{id}',
  Active: 'PUT /places/active/{id}',
  Managers: 'PUT /places/managers/{id}',
  Employees: 'PUT /places/employees/{id}',
  Clients: 'PUT /places/clients/{id}',
  Supliers: 'PUT /places/supliers/{id}',
  Contacts: 'PUT /places/contacts/{id}',
};
export { handler } from './handler';
export { count } from './count';
export { getAll } from './get-all';
export { getOne } from './get-one';
export { create } from './create';
export { update } from './update';
export { deleteOne } from './delete';
export { active } from './active';
export { managers } from './managers';
export { employees } from './employees';
export { clients } from './clients';
export { supliers } from './supliers';
export { contacts } from './contacts';
