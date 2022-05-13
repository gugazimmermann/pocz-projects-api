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
  const body = event.body ? JSON.parse(event.body) : null;
  if (event.routeKey === LambdaTypes.Login) return await login(body);
  if (event.routeKey === LambdaTypes.ChangePassword) return await changePassword(body);
  if (event.routeKey === LambdaTypes.ForgotPasswordCode) return await forgotPasswordCode(body);
  if (event.routeKey === LambdaTypes.ForgotPassword) return await forgotPassword(body);
  if (event.routeKey === LambdaTypes.RefreshToken) return await refreshToken(body);
  if (event.routeKey === LambdaTypes.Register) return await register(body);
  if (event.routeKey === LambdaTypes.Me) {
    const user = await DecodedId(event);
    if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
    return await me(user);
  }
  return CreateResponse(500, { message: 'No Event Type!' });
};
