import { Injectable } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async getExpense(id: number): Promise<Expense | null> {
    return await this.prisma.expense.findUnique({ where: { id } });
  }

  createExpense(data: Expense): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  updateExpense(id: number, data: Expense): Promise<Expense> {
    return this.prisma.expense.update({ where: { id: Number(id) }, data });
  }

  deleteExpense(id: number): Promise<Expense> {
    return this.prisma.expense.delete({ where: { id: Number(id) } });
  }
}
