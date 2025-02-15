import { Prisma } from '@prisma/client';

export class Expense implements Prisma.ExpenseCreateInput {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  notes: string | undefined | null;
  createdAt: Date;
  updatedAt: Date;
}
