import { AccountsModule } from './../accounts/accounts.module';
import { UsersService } from './user.service';
import { Module } from '@nestjs/common';
import { UsersProviders } from './user.provider';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  imports: [AccountsModule],
  providers: [UsersProviders, UsersService],
  exports: [UsersProviders, UsersService],
})
export class UserModule {}
