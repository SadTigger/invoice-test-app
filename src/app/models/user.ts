export interface User {
  login: string;
  password: string;
  role?: 'Regular_User' | 'Admin' | 'Guest';
}
