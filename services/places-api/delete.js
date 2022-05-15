import CreateResponse from "../../libs/response";
import { findOne } from "./utils";

export const deleteOne = async (tenantId, { id }) => {
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const resultData = await findOne(id, tenantId);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.destroy();
    return CreateResponse(200, { message: "Registro excluido com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
