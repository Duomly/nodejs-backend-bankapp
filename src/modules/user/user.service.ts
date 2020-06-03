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
      throw new Error('This email is already used');
    } else {
      user.Salt = crypto.randomBytes(128).toString('base64');
      user.Password = crypto.createHmac('sha256', user.Password + user.Salt).digest('hex');
      const newUser: any = await this.usersRepository.create<Users>(user);
      const jwtToken = jwt.sign(user, process.env.JWT_KEY, jwtConfig);
      newUser.Token = jwtToken;
      if (newUser) {
        this.accountsService.create(newUser.id);
      }
      return newUser;
    }
  }
}