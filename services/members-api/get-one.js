import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne as findOneUser } from "../profiles-api/utils";
import { usersResultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const resultData = await findOneUser(id, user.tenant);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, { data: usersResultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
