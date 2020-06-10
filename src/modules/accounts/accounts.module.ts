import { AccountsService } from './accounts.service';
import { AccountsProvider } from './accounts.provider';
import { AccountsController } from './accounts.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsProvider, AccountsService],
  exports: [AccountsService, AccountsProvider],
})
export class AccountsModule {}