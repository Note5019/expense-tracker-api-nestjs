import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  /**
   * Expense title
   * @example ""Grocery Shopping"
   */
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  /**
   * Expense amount
   * @example 100.10
   */
  @IsNumber()
  amount: number;

  /**
   * Date of expense
   */
  @IsDate()
  @Type(() => Date)
  date: Date;

  /**
   * Expense category name
   * @example "Food"
   */
  @IsString()
  @Transform(({ value }) => value.trim())
  category: string;

  /**
   * Remark
   * @example "Jot note"
   */
  @IsOptional()
  @IsString()
  notes?: string;
}
