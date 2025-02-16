import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('expense')
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseService.getAllExpenses();
  }
  @Post()
  async postExpense(@Body() postData: Expense): Promise<Expense> {
    return this.expenseService.createExpense(postData);
  }

  @Get(':id')
  async getExpense(@Param('id') id: number): Promise<Expense | null> {
    return this.expenseService.getExpense(Number(id));
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: number): Promise<Expense> {
    return this.expenseService.deleteExpense(id);
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: number,
    @Body() postData: Expense,
  ): Promise<Expense> {
    return this.expenseService.updateExpense(id, postData);
  }
}
