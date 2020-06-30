import { Accounts } from './../accounts/accounts.entity';
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
      // Update jwt token creation
      const jwtToken = jwt.sign({id: user.id, email: user.Email, username: user.Username}, process.env.JWT_KEY, jwtConfig);
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

  // Create login function
  public async login(credentials: any): Promise<object> {
    // Find the user
    const user = await Users.findOne<Users>({
      where: { Username: credentials.Username },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    // Handle no user
    if (!user) {
      return {
        success: false,
        message: 'User does not exist.',
      }
    }

    // Compare password
    const inputPassword = crypto.createHmac('sha256', credentials.Password + user.Salt.trim()).digest('hex');
    const isPasswordCorrect = user.Password.trim() === inputPassword.trim();
    
    // Handle incorrect password
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: 'Password is not correct.',
      }
    }

    // Get user's accounts
    const accounts = await this.accountsService.getAccountsByUserId(user.id);

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user.id, email: user.Email, username: user.Username }, process.env.JWT_KEY, jwtConfig);
    
    // Create response object
    const response = {
      user: {
        id: user.id,
        username: user.Username.trim(),
        email: user.Email.trim(),
        accounts,
      },
      token: jwtToken,
      success: true,
    }
    return response;
  }

  // Define authentication function
  public async authenticate(id: number, token: string): Promise<any> {
    // Get user by id with accounts
    const user = await Users.findOne<Users>({
      where: {
        id,
      },
      include: [
        {
          model: Accounts,
          where: {
            UserId: id,
          },
          required: true,
        },
      ],
    });

    // Decode  token and compare ids 
    const decodedToken = jwt.verify(token, process.env.JWT_KEY, jwtConfig)
    const isTokenValid = decodedToken.id === Number(id);

    // Handle worng data
    if (!isTokenValid) {
      return {
        success: false,
        message: 'User is not authorized.',
      }
    }

    // Create and return response object
    const response = {
      user: {
        id: user.id,
        username: user.Username.trim(),
        email: user.Email.trim(),
        accounts: user.accounts,
      },
      token: token,
      success: true,
    }
    return response;
  }
}