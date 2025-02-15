import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Expense } from './expense.model';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async getExpense(id: number): Promise<Expense | null> {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  async createExpense(data: Expense): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  async updateExpense(id: number, data: Expense): Promise<Expense> {
    return this.prisma.expense.update({ where: { id: Number(id) }, data });
  }

  async deleteExpense(id: number): Promise<Expense> {
    return this.prisma.expense.delete({ where: { id: Number(id) } });
  }
}
