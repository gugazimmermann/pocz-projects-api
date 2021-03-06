import jwt from "jsonwebtoken";
import config from "../../libs/jwt-config";

function generatePolicyDocument(effect, methodArn) {
  if (!methodArn) return null;
  return { Version: "2012-10-17", Statement: [ { Action: "execute-api:Invoke", Effect: effect, Resource: "*" } ] };
}

function generateAuthResponse(principalId, effect, methodArn) {
  return { principalId, policyDocument: generatePolicyDocument(effect, methodArn) };
}

export const handler = async (event) => {
  const methodArn = event.methodArn || event.routeArn;
  const Authorization = event.headers?.Authorization || event.headers?.authorization;
  if (!Authorization || !methodArn) return generateAuthResponse(undefined, "Deny", methodArn);
  const token = Authorization.replace("Bearer ", "");
  if (!token) return generateAuthResponse(undefined, "Deny", methodArn);
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return generateAuthResponse(decoded.id, "Allow", methodArn);
  } catch (err) {
    return generateAuthResponse(undefined, "Deny", methodArn);
  }
};
