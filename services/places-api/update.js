import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { validateEmail } from "../../libs/utils";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  const { name, zip, address, neighborhood, city, state } = JSON.parse(
    event?.body
  );
  if (!id || !name || !zip || !address || !neighborhood || !city || !state)
    return CreateResponse(400, { message: "Dados inválidos!" });
  if (email && !validateEmail(email))
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const resultData = await findOne(id, user.tenant);
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.update({ name, zip, address, neighborhood, city, state });
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
