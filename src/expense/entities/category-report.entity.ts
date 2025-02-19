export class CategoryReport {
  category: string;
  total_expenses: number;

  constructor(partial: Partial<Report>) {
    Object.assign(this, partial);
  }
}
