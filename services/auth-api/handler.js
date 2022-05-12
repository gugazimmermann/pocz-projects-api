import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import {
  LambdaTypes,
  login,
  changePassword,
  forgotPasswordCode,
  forgotPassword,
  me,
  refreshToken,
  register
} from './index';

export const handler = async (event, context) => {
  const { path } = event.requestContext?.http;
  const body = event.body ? JSON.parse(event?.body) : null;
  if (path === LambdaTypes.Login) return await login(body);
  if (path === LambdaTypes.ChangePassword) return await changePassword(body);
  if (path === LambdaTypes.ForgotPasswordCode) return await forgotPasswordCode(body);
  if (path === LambdaTypes.ForgotPassword) return await forgotPassword(body);
  if (path === LambdaTypes.RefreshToken) return await refreshToken(body);
  if (path === LambdaTypes.Register) return await register(body);
  if (path === LambdaTypes.Me) {
    const user = await DecodedId(event);
    if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
    return await me(user);
  }
  return CreateResponse(500, { message: 'No Event Type!' });
};
