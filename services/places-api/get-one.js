import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const getOne = async (tenantId, { id }) => {
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const resultData = await findOne(id, tenantId);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
