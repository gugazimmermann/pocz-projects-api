import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const active = async (tenantId, { id }, { active }) => {
  if (!id || typeof active !== "boolean") return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const resultData = await findOne(id, tenantId);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    resultData.active = active;
    await resultData.save();
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
