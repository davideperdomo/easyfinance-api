import { Request, Response } from 'express';
import { ExpenseCreator } from '../../modules/expense/application/expenseCreator';
import { ExpenseGetByUserId } from '../../modules/expense/application/expenseGetByUserId';
import { ExpenseDeleter } from '../../modules/expense/application/expense-deleter';

export class ExpenseController {
  constructor(
    private expenseCreator: ExpenseCreator,
    private expenseGetByUserId: ExpenseGetByUserId,
    private expenseDeleter: ExpenseDeleter
  ) {}

  async createExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseData = req.body;
      const expense = await this.expenseCreator.run(expenseData);
      res.status(201).json(expense.toPlainData());
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const expenses = await this.expenseGetByUserId.run(userId);
      res.status(200).json(expenses);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseId = req.params.expenseId;
      await this.expenseDeleter.run(expenseId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
