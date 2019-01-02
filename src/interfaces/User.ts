export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmedEmail: 0 | 1;
  admin: 0 | 1;
  forgotPasswordLocked: 0 | 1;
}