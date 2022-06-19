import CreateResponse from "../../libs/response";
import { findAll } from "../shared/profiles-utils";
import { usersResultToData } from "./utils";

export const getAll = async (tenantId, userId) => {
  try {
    const resultData = await findAll(userId, tenantId);
    const body = [];
    if (resultData.length > 0) resultData.forEach((d) => body.push(usersResultToData(d)));
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
