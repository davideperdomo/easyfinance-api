import { ExpenseId } from '../domain/expense';
import { ExpenseRepository } from '../domain/expense.repository';

export class ExpenseDeleter {
  constructor(private expenseRepository: ExpenseRepository) {}

  async run(plainExpenseId: string): Promise<void> {
    const expenseId = new ExpenseId(plainExpenseId);
    await this.expenseRepository.delete(expenseId);
  }
}
