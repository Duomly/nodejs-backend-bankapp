import { Accounts } from './accounts.entity';

export const AccountsProvider = {
  provide: 'ACCOUNTS_REPOSITORY',
  useValue: Accounts
};