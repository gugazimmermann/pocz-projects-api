import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  const { managers } = JSON.parse(event?.body);
  if (!id || !managers)
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const place = await findOne(id, user.tenant);
    if (!place)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    if (place.managersPlace) {
      const exintingManagers = place.managersPlace.map((m) => m.id);
      await place.removeManagersPlace(exintingManagers);
      await place.save();
    }
    const managersIds = managers.map((m) => m.id);
    await place.addManagersPlace(managersIds);
    await place.save();
    const resultData = await findOne(id, user.tenant);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
