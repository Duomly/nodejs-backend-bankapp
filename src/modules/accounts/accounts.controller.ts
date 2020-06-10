import { AccountsService } from './accounts.service';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) { }

  // @Post('create-account')
  // public async register(@Body() UserId: number): Promise<any> {
  //   const result: any = await this.accountsService.create(UserId);
  //   if (!result.success) {
  //     throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
  //   }
  //   return result;
  // }
}