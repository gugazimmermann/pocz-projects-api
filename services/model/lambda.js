import CreateResponse from "../../libs/response";

export const handler = async (event, context) => {
  console.log(event);
  return CreateResponse(200, { body: event });
};
