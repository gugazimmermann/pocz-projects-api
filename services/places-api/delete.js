import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const resultData = await findOne(id, user.tenant);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.destroy();
    return CreateResponse(200, { message: "Registro excluido com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
