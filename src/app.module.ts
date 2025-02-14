import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ExpensesController } from './controllers/expenses/expenses.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ExpensesController],
  providers: [AppService],
})
export class AppModule { }
