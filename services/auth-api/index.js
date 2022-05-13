export const LambdaTypes = {
  Login: 'POST /auth/login',
  ChangePassword: 'POST /auth/change-password',
  ForgotPasswordCode: 'POST /auth/forgot-password-code',
  ForgotPassword: 'POST /auth/forgot-password',
  Me: 'GET /auth/me',
  RefreshToken: 'POST /auth/refresh-token',
  Register: 'POST /auth/register'
};
export { handler } from './handler';
export { login } from './login';
export { changePassword } from './change-password';
export { forgotPasswordCode } from './forgot-password-code';
export { forgotPassword } from './forgot-password';
export { me } from './me';
export { refreshToken } from './refresh-token';
export { register } from './register';
