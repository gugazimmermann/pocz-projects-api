import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const create = async (tenantId, place) => {
  if (!place.name || !place.zip || !place.address || !place.city || !place.state) return CreateResponse(400, { message: "Dados inválidos!" });
  if (place.email && !validateEmail(place.email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Places } = await database();
    const newPlace = await Places.create({...place, active: true, tenantId });
    const resultData = await findOne(newPlace.id, tenantId);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
