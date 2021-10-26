import jwt from "jsonwebtoken";
import config from "../../libs/jwt-config";

function generateAuthResponse(principalId, effect, methodArn) {
  const policyDocument = generatePolicyDocument(effect, methodArn);
  return { principalId, policyDocument };
}

function generatePolicyDocument(effect, methodArn) {
  if (!methodArn) return null;
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: "*",
      },
    ],
  };
  return policyDocument;
}

export const handler = async (event, context) => {
  const { authorizationToken, methodArn } = event;
  if (!authorizationToken || !methodArn)
    return generateAuthResponse(undefined, "Deny", methodArn);
  const token = authorizationToken.replace("Bearer ", "");
  if (!token) return generateAuthResponse(undefined, "Deny", methodArn);
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return generateAuthResponse(decoded.id, "Allow", methodArn);
  } catch (err) {
    return generateAuthResponse(undefined, "Deny", methodArn);
  }
};
