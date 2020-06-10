import { Injectable, Inject } from '@nestjs/common';
import { Users } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwtConfig';
import crypto = require('crypto');
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
    private accountsService: AccountsService,
  ) { } 

  public async create(user: any): Promise<object> {
    const exists = await Users.findOne({ where: { Email: user.Email } });

    if (exists) {
      return {
        success: false,
        message: 'This email already exists.'
      }
    } else {
      user.Salt = crypto.randomBytes(128).toString('base64');
      user.Password = crypto.createHmac('sha256', user.Password + user.Salt).digest('hex');
      const newUser: any = await this.usersRepository.create<Users>(user);
      const jwtToken = jwt.sign(user, process.env.JWT_KEY, jwtConfig);
      newUser.Token = jwtToken;
      if (newUser) {
        const account = await this.accountsService.create(newUser.id);
        const accounts = [account];
        const response = {
          user: {
            id: newUser.id,
            username: newUser.Username.trim(),
            email: newUser.Email.trim(),
            accounts,
          },
          token: jwtToken,
          success: true,
        }
        return response;
      }
      return { 
        success: false,
        message: 'Creating new user went wrong.',
      }
    }
  }
}