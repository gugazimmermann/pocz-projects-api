import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const changeOwner = async (tenantID, person) => {
  if (!person.id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const data = await findOne(person.id, tenantID);
    if (!data) return CreateResponse(404, { message: "Registro não encontrado!" });
    const userIds = person.owners.filter((o) => o.type === "person").map((x) => x.id);
    const placeIds = person.owners.filter((o) => o.type === "place").map((x) => x.id);
    if (data.type === "clients") {
      await data.removeUserClients(await data.getUserClients());
      await data.removePlaceClients(await data.getPlaceClients());
      if (userIds) await data.addUserClients(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    if (data.type === "contacts") {
      await data.removeUserContacts(await data.getUserContacts());
      await data.removePlaceContacts(await data.getPlaceContacts());
      if (userIds) await data.addUserContacts(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    if (data.type === "supliers") {
      await data.removeUserSupliers(await data.getUserSupliers());
      await data.removePlaceSupliers(await data.getPlaceSupliers());
      if (userIds) await data.addUserSupliers(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    const resultData = await findOne(person.id, tenantID);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
