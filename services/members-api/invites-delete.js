import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const { Invites } = await database();
    const resultData = await Invites.findByPk(id);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    if (resultData.tenantId !== user.tenant)
      return CreateResponse(401, { message: "Sem permissão!" });
    await resultData.destroy();
    return CreateResponse(200, { message: "Registro excluido com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
