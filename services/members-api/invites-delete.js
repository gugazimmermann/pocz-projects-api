import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const invitesDelete = async (tenantId, id) => {
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Invites } = await database();
    const resultData = await Invites.findByPk(id);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    if (resultData.tenantId !== tenantId) return CreateResponse(401, { message: "Sem permissão!" });
    await resultData.destroy();
    return CreateResponse(200, { message: "Registro excluido com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
