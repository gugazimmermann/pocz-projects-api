function CreateResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  };
}

export default CreateResponse;
