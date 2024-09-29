import { ExpensePlainData, ExpenseUserId } from '../domain/expense';
import { ExpenseRepository } from '../domain/expense.repository';

export class ExpenseGetByUserId {
  constructor(private expenseRepository: ExpenseRepository) {}

  async run(userId: string): Promise<ExpensePlainData[]> {
    const expenseUserId = new ExpenseUserId(userId);
    const expenses = await this.expenseRepository.findByUserId(expenseUserId);
    
    return expenses.map((expense) => expense.toPlainData());
  }
}
