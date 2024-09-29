import { ExpenseCreator } from '../../../modules/expense/application/expenseCreator';
import { ExpenseRepository } from '../../../modules/expense/domain/expense.repository';
import { Expense, ExpensePlainData } from '../../../modules/expense/domain/expense';

describe('ExpenseCreator', () => {
    let expenseRepository: ExpenseRepository;
    let expenseCreator: ExpenseCreator;

    beforeEach(() => {
        expenseRepository = {
            save: jest.fn(),
            findById: jest.fn(),
        };
        expenseCreator = new ExpenseCreator(expenseRepository);
    });
    it('should create an expense and save it', async () => {
        const expenseData: ExpensePlainData = {
            id: '1',
            amount: 500,
            frequency: 'weekly',
            userId: '1',
            category: 'food',
        };

        const expense = await expenseCreator.run(expenseData);

        expect(expenseRepository.save).toHaveBeenCalledWith(expense);
        expect(expense).toBeInstanceOf(Expense);
    });
});
