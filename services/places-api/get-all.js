import CreateResponse from "../../libs/response";
import { findAll, resultToData } from "./utils";

export const getAll = async (tenantId) => {
  try {
    const resultData = await findAll(tenantId);
    const data = [];
    if (resultData.length > 0) resultData.forEach((d) => data.push(resultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
