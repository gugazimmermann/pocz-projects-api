import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { name, zip, address, neighborhood, city, state } = JSON.parse(
    event?.body
  );
  if (!name || !zip || !address || !neighborhood || !city || !state)
    return CreateResponse(400, { message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email))
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const { Places } = await database();
    const place = await Places.create({
      ...body,
      active: true,
      tenantId: user.tenant,
    });
    const resultData = await findOne(place.id, place.tenantId);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
