import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class QueryExpenseDto {
  /**
   * Start date
   * @example "2025-01-01"
   */
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  /**
   * End date
   * @example "2025-01-01"
   */
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  /**
   * Category of expense
   */
  @IsString()
  @IsOptional()
  category?: string;
}
