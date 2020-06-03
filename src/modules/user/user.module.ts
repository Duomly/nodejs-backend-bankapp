import { AccountsModule } from './../accounts/accounts.module';
import { UsersService } from './user.service';
import { Module } from '@nestjs/common';
import { UsersProvider } from './user.provider';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  imports: [AccountsModule],
  providers: [UsersProvider, UsersService],
  exports: [UsersProvider, UsersService],
})
export class UserModule {}
