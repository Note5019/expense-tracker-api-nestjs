import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpenseModule } from './expense/expense.module';
@Module({
  imports: [ConfigModule.forRoot(), ExpenseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
