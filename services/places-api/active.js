import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  const { active } = JSON.parse(event?.body);
  if (!id || typeof active !== "boolean") {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const user = await DecodedId(event);
    const resultData = await findOne(id, user.tenant);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    resultData.active = active;
    await resultData.save();
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
