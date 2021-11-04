import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { validateEmail } from "../../libs/utils";
import { resultToData } from "./utils";

export const handler = async (event, context) => {
  const { name, email, address, neighborhood, city, state, phone, zip } =
    JSON.parse(event?.body);
  if (
    !name ||
    !email ||
    !validateEmail(email) ||
    !address ||
    !neighborhood ||
    !city ||
    !state ||
    !phone ||
    !zip
  )
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const { Profiles } = await database();
    const resultData = Profiles.findOne({ where: { userId: user.id } });
    if (!resultData)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.update({
      name,
      email,
      address,
      neighborhood,
      city,
      state,
      phone,
      zip,
    });
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
