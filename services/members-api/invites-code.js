import CreateResponse from "../../libs/response";
import { findOneInvite, invitesResultToData } from "./utils";

export const invitesCode = async (tenantId, code) => {
  if (!code) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const resultData = await findOneInvite(code, tenantId);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, { body: { ...invitesResultToData(resultData), code: resultData.code } });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
