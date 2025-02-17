import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateExpenseDto } from './dto/create-espense.dto';
import { UpdateExpenseDto } from './dto/update-espense.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('expense')
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses(): Promise<Expense[]> {
    // TODO: where userId
    return this.expenseService.getAllExpenses();
  }

  @Post()
  @ApiBody({
    description: 'Create a expense for the authen user.',
    type: CreateExpenseDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created an expense.',
  })
  async createExpense(
    @Request() req,
    @Body() expenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.createExpense(
      req.user.userId as number,
      expenseDto,
    );
  }

  @Get(':id')
  async getExpense(@Param('id') id: number): Promise<Expense | null> {
    // TODO: where userId
    return this.expenseService.getExpense(Number(id));
  }

  @Delete(':id')
  async deleteExpense(
    @Request() req,
    @Param('id') id: number,
  ): Promise<Expense> {
    return this.expenseService.deleteExpense(req.user.userId as number, id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Update a expense for the authen user.',
    type: UpdateExpenseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the expense.',
  })
  async updateExpense(
    @Request() req,
    @Param('id') id: number,
    @Body() expenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.updateExpense(
      req.user.userId as number,
      id,
      expenseDto,
    );
  }
}
