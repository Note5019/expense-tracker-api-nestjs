import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateExpenseDto } from './dto/create-espense.dto';
import { UpdateExpenseDto } from './dto/update-espense.dto';
import { QueryExpenseDto } from './dto/query-expense.dto';
import { Report } from './entities/report.entity';
import { PaginatedResult } from 'src/utils/pagination';
import { PaginateOptions } from 'src/utils/paginate.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('expense')
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses(
    @Request() req,
    @Query() query?: QueryExpenseDto,
    @Query() paginateOptions?: PaginateOptions,
  ): Promise<PaginatedResult<Expense>> {
    // TODO: test case
    // TODO: deploy api to clud service
    // TODO: readme instruction
    // TODO: swagger + postman
    return this.expenseService.getAllExpenses(
      req.user.userId as number,
      query,
      paginateOptions,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('reports')
  async getReport(
    @Request() req,
    @Query() query?: QueryExpenseDto,
  ): Promise<Report> {
    return await this.expenseService.getReport(
      req.user.userId as number,
      query,
    );
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
  async getExpense(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Expense | null> {
    return this.expenseService.getExpense(req.user.userId as number, id);
  }

  @Delete(':id')
  async deleteExpense(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
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
    @Param('id', ParseIntPipe) id: number,
    @Body() expenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.updateExpense(
      req.user.userId as number,
      id,
      expenseDto,
    );
  }
}
