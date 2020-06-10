import { UsersService } from './user.service';
import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('register')  
    public async register(@Res() res, @Body() user: IUser): Promise<any> {    
    const result: any = await this.usersService.create(user);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return res.status(HttpStatus.OK).json(result);  
  }
}