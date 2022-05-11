import { v4 as uuidv4 } from "uuid";

function CreateResponse(statusCode, body) {
  const responseId = uuidv4();
  const res = {
    statusCode: statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ ...body, responseId }),
  };
  console.debug(JSON.stringify({ ...body, responseId }, undefined, 2));
  return res;
}

export default CreateResponse;
