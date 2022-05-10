import CreateResponse from "../../libs/response";

export const me = async ({ id: userId, active, email, createdAt, updatedAt }) => {
  return CreateResponse(200, { userId, active, email, createdAt, updatedAt });
};
