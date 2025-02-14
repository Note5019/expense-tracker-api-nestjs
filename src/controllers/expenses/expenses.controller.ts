import { Controller, Get } from '@nestjs/common';

@Controller('expenses')
export class ExpensesController {
    @Get()
    findAll(): string {
        return 'Test return';
    }
}
