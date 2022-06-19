import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "../shared/profiles-utils";

export const get = async ({ id, tenant }) => {
  try {
    const resultData = await findOne(id, tenant);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
