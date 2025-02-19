import { Injectable } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateExpenseDto } from './dto/create-espense.dto';
import { UpdateExpenseDto } from './dto/update-espense.dto';
import { QueryExpenseDto } from './dto/query-expense.dto';
import { Report } from './entities/report.entity';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/utils/pagination';
import { PaginateOptions } from 'src/utils/paginate.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  getAllExpenses(
    userId: number,
    query?: QueryExpenseDto,
    paginateOptions?: PaginateOptions,
  ): Promise<PaginatedResult<Expense>> {
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

    const orderBy = [
      {
        date: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ];
    const paginate: PaginateFunction = paginator({ perPage: 10 });

    return paginate(this.prisma.expense, { where, orderBy }, paginateOptions);
  }

  async getReport(userId: number, query?: QueryExpenseDto): Promise<Report> {
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
    const categoryGroup = await this.prisma.expense.groupBy({
      by: ['category'],
      where,
      _sum: {
        amount: true,
      },
    });

    const categoryGroup2 = categoryGroup.map((cat) => {
      return {
        category: cat.category,
        total_expenses:
          Math.round((cat._sum.amount ?? 0 + Number.EPSILON) * 100) / 100,
      };
    });

    return new Report({
      categories: categoryGroup2,
      total_expenses: categoryGroup2.reduce(
        (sum, cat) => sum + cat.total_expenses,
        0,
      ),
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
