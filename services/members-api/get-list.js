import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findAll as findAllUsers } from "../profiles-api/utils";
import { usersResultToListData } from "./utils";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const resultData = await findAllUsers(user.id, user.tenant);
    let data = [];
    if (resultData.length > 0) {
      const allData = [];
      resultData.forEach((d) => allData.push(usersResultToListData(d)));
      data = allData.filter((d) => d.active);
      data.sort((a, b) => a.name.localeCompare(b.name));
    }
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
