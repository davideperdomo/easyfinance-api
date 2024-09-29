import { ExpenseRepository } from './expense.repository';
import { ExpenseUserId } from './expense';

export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) {}

  async calculateTotalUserExpense(plainUserId: string): Promise<number> {
    const userId = new ExpenseUserId(plainUserId);
    const expenses = await this.expenseRepository.findByUserId(userId);
    return expenses.reduce((total, expense) => total + expense.amount.value, 0);
  }
}
