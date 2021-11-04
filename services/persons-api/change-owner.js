import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  const body = JSON.parse(event?.body);
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const data = await findOne(id, user.tenant);
    if (!data)
      return CreateResponse(404, { message: "Registro não encontrado!" });

    const userIds = body.owners
      .filter((o) => o.type === "person")
      .map((x) => x.id);
    const placeIds = body.owners
      .filter((o) => o.type === "place")
      .map((x) => x.id);

    if (data.type === "Clientes") {
      const currentUsers = await data.getUserClients();
      await data.removeUserClients(currentUsers);
      const currentPlaces = await data.getPlaceClients();
      await data.removePlaceClients(currentPlaces);
      if (userIds) await data.addUserClients(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    if (data.type === "Contatos") {
      const currentUsers = await data.getUserContacts();
      await data.removeUserContacts(currentUsers);
      const currentPlaces = await data.getPlaceContacts();
      await data.removePlaceContacts(currentPlaces);
      if (userIds) await data.addUserContacts(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    if (data.type === "Fornecedores") {
      const currentUsers = await data.getUserSupliers();
      await data.removeUserSupliers(currentUsers);
      const currentPlaces = await data.getPlaceSupliers();
      await data.removePlaceSupliers(currentPlaces);
      if (userIds) await data.addUserSupliers(userIds);
      if (placeIds) await data.addPlaceClients(placeIds);
    }
    const resultData = await findOne(id, user.tenant);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
