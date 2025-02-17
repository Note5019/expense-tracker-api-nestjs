import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-espense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
