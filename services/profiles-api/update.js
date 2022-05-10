import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { resultToData } from "../shared/profiles-utils";

export const update = async (userId, { name, email, address, neighborhood, city, state, phone, zip }) => {
  if (!name || !email || !validateEmail(email) || !address || !city || !state || !phone || !zip ) 
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Profiles } = await database();
    const resultData = await Profiles.findOne({ where: { userId } });
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.update({ name, email, address, neighborhood, city, state, phone, zip });
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
