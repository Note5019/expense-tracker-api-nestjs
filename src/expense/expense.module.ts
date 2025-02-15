import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ExpenseService, PrismaService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
