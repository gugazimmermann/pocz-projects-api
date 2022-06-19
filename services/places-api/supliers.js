import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const supliers = async (tenantId, { id }, { supliersList }) => {
  if (!id || !supliersList) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const place = await findOne(id, tenantId);
    if (!place) return CreateResponse(404, { message: "Registro não encontrado!" });
    if (place.clientsPlace) {
      await place.removeSupliersPlace(place.supliersPlace.map((s) => s.id));
      await place.save();
    }
    await place.addSupliersPlace(supliersList.map((s) => s.id));
    await place.save();
    const resultData = await findOne(id, tenantId);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
