import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findAll as findAllUsers } from "../profiles-api/utils";
import { usersResultToData } from "./utils";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const resultData = await findAllUsers(user.id, user.tenant);
    const data = [];
    if (resultData.length > 0)
      resultData.forEach((d) => data.push(usersResultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
