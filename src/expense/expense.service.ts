import { Injectable } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateExpenseDto } from './dto/create-espense.dto';
import { UpdateExpenseDto } from './dto/update-espense.dto';
import { QueryExpenseDto } from './dto/query-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  getAllExpenses(userId: number, query?: QueryExpenseDto): Promise<Expense[]> {
    const where = {
      userId: Number(userId),
    };

    const dateQuery = {};
    if (query?.startDate) {
      dateQuery['gte'] = query?.startDate;
    }
    if (query?.endDate) {
      dateQuery['lte'] = query?.endDate;
    }
    Object.assign(where, { date: dateQuery });

    if (query?.category) {
      Object.assign(where, { category: { contains: query?.category } });
    }
    return this.prisma.expense.findMany({
      where,
      orderBy: [
        {
          date: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async getExpense(userId: number, id: number): Promise<Expense | null> {
    return await this.prisma.expense.findUnique({
      where: { id, userId: Number(userId) },
    });
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
