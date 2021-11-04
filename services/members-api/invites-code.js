import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOneInvite, invitesResultToData } from "./utils";

export const handler = async (event, context) => {
  const { code } = event?.pathParameters;
  if (!code) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const resultData = await findOneInvite(code, user.tenant);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, {
      data: { ...invitesResultToData(resultData), code: resultData.code },
    });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
