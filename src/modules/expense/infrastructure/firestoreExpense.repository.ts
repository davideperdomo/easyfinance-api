import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { Expense, ExpenseId, ExpensePlainData, ExpenseUserId } from '../domain/expense';
import { ExpenseRepository } from '../domain/expense.repository';

export class FirestoreExpenseRepository extends FirestoreRepository implements ExpenseRepository {
  private collectionName = 'expenses';

  async save(expense: Expense): Promise<void> {
    const expenseData = expense.toPlainData();
    const filteredData = this.filterUndefinedValues(expenseData);
    await this.createDocument(this.collectionName, filteredData, filteredData.id);
  }

  async findByUserId(userId: ExpenseUserId): Promise<Expense[]> {
    const expensesData = await this.queryDocuments<ExpensePlainData>(this.collectionName, 'userId', userId.value);
    return expensesData.map((expenseData) => Expense.fromPlainData(expenseData as ExpensePlainData));
  }

  async findById(id: ExpenseId): Promise<Expense | null> {
    const expenseData = await this.readDocument(this.collectionName, id.value);
    return expenseData ? Expense.fromPlainData(expenseData as ExpensePlainData) : null;
  }

  async update(expense: Expense): Promise<Expense> {
    const expenseData = expense.toPlainData();
    const filteredData = this.filterUndefinedValues(expenseData);
    await this.updateDocument(this.collectionName, filteredData.id, filteredData);
    return Expense.fromPlainData(filteredData);
  }

  async delete(id: ExpenseId): Promise<void> {
    await this.deleteDocument(this.collectionName, id.value);
  }

  private filterUndefinedValues(data: any): any {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
  }
}
