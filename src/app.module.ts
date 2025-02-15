import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpenseModule } from './expense/expense.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ConfigModule.forRoot(), ExpenseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
