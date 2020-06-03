import { Injectable, Inject } from '@nestjs/common';
import { Accounts } from './accounts.entity';

@Injectable()
export class AccountsService { 
  constructor(
    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: typeof Accounts
  ) { }

  public async create(UserId: number): Promise<object> {
    const account = {
      Name: 'Account',
      Type: 'Personal Account',
      Balance: 100,
      UserId: UserId,
    }

    const newAccount: any = await this.accountsRepository.create<Accounts>(account);
    return newAccount;
  }
}
