import CreateResponse from "../../libs/response";
import { findAll } from "../shared/profiles-utils";
import { usersResultToListData } from "./utils";

export const getList = async (tenantId, userId) => {
  try {
    const resultData = await findAll(userId, tenantId);
    const allData = [];
    (resultData.length ? resultData : 0).forEach((d) => allData.push(usersResultToListData(d)));
    const data = allData.filter((d) => d.active);
    data.sort((a, b) => a.name.localeCompare(b.name));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
