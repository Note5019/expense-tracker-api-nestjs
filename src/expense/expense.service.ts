import { Injectable } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateExpenseDto } from './dto/create-espense.dto';
import { UpdateExpenseDto } from './dto/update-espense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async getExpense(id: number): Promise<Expense | null> {
    return await this.prisma.expense.findUnique({ where: { id } });
  }

  createExpense(userId: number, data: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  updateExpense(
    userId: number,
    expenseId: number,
    data: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id: Number(expenseId), userId: Number(userId) },
      data,
    });
  }

  deleteExpense(userId: number, id: number): Promise<Expense> {
    return this.prisma.expense.delete({
      where: { id: Number(id), userId: Number(userId) },
    });
  }
}
