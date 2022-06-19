import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const managers = async (tenantId, { id }, { managersList }) => {
  if (!id || !managersList) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const place = await findOne(id, tenantId);
    if (!place)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    if (place.managersPlace) {
      await place.removeManagersPlace(place.managersPlace.map((m) => m.id));
      await place.save();
    }
    await place.addManagersPlace(managersList.map((m) => m.id));
    await place.save();
    const resultData = await findOne(id, tenantId);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
