export const LambdaTypes = {
  Login: 'Login',
  ChangePassword: 'ChangePassword',
  ForgotPasswordCode: 'ForgotPasswordCode',
  ForgotPassword: 'ForgotPassword',
  Me: 'Me',
  RefreshToken: 'RefreshToken',
  Register: 'Register'
};
export { handler } from './handler';
export { login } from './login';
export { changePassword } from './change-password';
export { forgotPasswordCode } from './forgot-password-code';
export { forgotPassword } from './forgot-password';
export { me } from './me';
export { refreshToken } from './refresh-token';
export { register } from './register';
