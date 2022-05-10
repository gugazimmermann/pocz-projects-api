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

export const handler = async (event) => {
  const body = JSON.parse(event?.body);
  if (body.type === LambdaTypes.Login) return await login(body.object);
  if (body.type === LambdaTypes.ChangePassword) return await changePassword(body.object);
  if (body.type === LambdaTypes.ForgotPasswordCode) return await forgotPasswordCode(body.object);
  if (body.type === LambdaTypes.ForgotPassword) return await forgotPassword(body.object);
  if (body.type === LambdaTypes.RefreshToken) return await refreshToken(body.object);
  if (body.type === LambdaTypes.Register) return await register(body.object);
  if (body.type === LambdaTypes.Me) {
    const user = await DecodedId(event);
    if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
    return await me(user);
  }
  return CreateResponse(500, { message: 'No Event Type!' });
};
