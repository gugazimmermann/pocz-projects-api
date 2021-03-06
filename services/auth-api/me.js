import CreateResponse from "../../libs/response";

export const me = async ({ id: userId, active, email, createdAt, updatedAt }) => {
  return CreateResponse(200, { body: { userId, active, email, createdAt, updatedAt }});
};
