export interface IUser {
  id: number;
  Username: string;
  Email: string;
  Password: string;
  Salt: string;
  Accounts: [];
}