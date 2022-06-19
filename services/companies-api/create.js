import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const create = async (tenantId, company) => {
  if (!company.type || !company.name) return CreateResponse(400, { message: "Dados inválidos!" });
  if (company.email && !validateEmail(company.email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Companies } = await database();
    for (const key in company) if (company[key] === "") company[key] = null;
    const newCompany = await Companies.create({ ...company, tenantId });
    const resultData = await findOne(newCompany.id, tenantId);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
