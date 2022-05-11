export const LambdaTypes = {
  Login: '/auth/login',
  ChangePassword: '/auth/change-password',
  ForgotPasswordCode: '/auth/forgot-password-code',
  ForgotPassword: '/auth/forgot-password',
  Me: '/auth/me',
  RefreshToken: '/auth/refresh-token',
  Register: '/auth/register'
};
export { handler } from './handler';
export { login } from './login';
export { changePassword } from './change-password';
export { forgotPasswordCode } from './forgot-password-code';
export { forgotPassword } from './forgot-password';
export { me } from './me';
export { refreshToken } from './refresh-token';
export { register } from './register';
