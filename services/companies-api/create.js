import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const body = JSON.parse(event?.body);
  if (!body.type || !body.name)
    return CreateResponse(400, { message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email))
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const { Persons } = await database();
    for (const key in body) if (body[key] === "") body[key] = null;
    const person = await Persons.create({ ...body, tenantId: user.tenant });
    const resultData = await findOne(person.id, person.tenantId);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
