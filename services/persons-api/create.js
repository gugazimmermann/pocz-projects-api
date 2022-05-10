import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const create = async (tenantId, person) => {
  if (!person.type || !person.name) return CreateResponse(400, { message: "Dados inválidos!" });
  if (person.email && !validateEmail(person.email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Persons } = await database();
    for (const key in person) if (person[key] === "") person[key] = null;
    const newPerson = await Persons.create({ ...person, tenantId });
    const resultData = await findOne(newPerson.id, tenantId);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
