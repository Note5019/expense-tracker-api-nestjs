import { CategoryReport } from './category-report.entity';

export class Report {
  categories: CategoryReport[];
  total_expenses: number;

  constructor(partial: Partial<Report>) {
    Object.assign(this, partial);
  }
}
