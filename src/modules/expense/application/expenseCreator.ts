import { Expense, ExpensePlainData } from '../domain/expense';
import { ExpenseRepository } from '../domain/expense.repository';

export class ExpenseCreator {
    constructor(private expenseRepository: ExpenseRepository) {}

    async run(expenseData: ExpensePlainData): Promise<Expense> {
        const expense = Expense.fromPlainData(expenseData);
        await this.expenseRepository.save(expense);
        return expense;
    }
}
