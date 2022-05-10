import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const update = async (tenantId, id, place) => {
  if (!id || !place.name || !place.zip || !place.address || !place.city || !place.state) return CreateResponse(400, { message: "Dados inválidos!" });
  if (place.email && !validateEmail(place.email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const resultData = await findOne(id, tenantId);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.update(place);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
