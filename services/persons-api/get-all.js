import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findAll, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { type } = event?.pathParameters;
  if (!type) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const resultData = await findAll(type, user.tenant);
    const data = [];
    if (resultData.length > 0)
      resultData.forEach((d) => data.push(resultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
