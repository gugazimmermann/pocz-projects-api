import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
    const resultData = await findOne(user.id);
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
