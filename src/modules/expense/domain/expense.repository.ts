import { Expense, ExpenseId, ExpenseUserId } from '../domain/expense';

export interface ExpenseRepository {
  save(expense: Expense): Promise<void>;
  findByUserId(userId: ExpenseUserId): Promise<Expense[]>;
  findById(id: ExpenseId): Promise<Expense | null>;
  delete(id: ExpenseId): Promise<void>;
}
