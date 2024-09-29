import { Request, Response } from 'express';
import { IncomeCreator } from '../../modules/income/application/incomeCreator';
import { IncomeGetByUserId } from '../../modules/income/application/incomeGetByUserId';
import { IncomeDeleter } from '../../modules/income/application/income-deleter';

export class IncomeController {
  constructor(
    private incomeCreator: IncomeCreator,
    private incomeGetByUserId: IncomeGetByUserId,
    private incomeDeleter: IncomeDeleter
  ) {}

  async createIncome(req: Request, res: Response): Promise<void> {
    try {
      const incomeData = req.body;
      const income = await this.incomeCreator.run(incomeData);
      res.status(201).json(income.toPlainData());
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
      const incomes = await this.incomeGetByUserId.run(userId);
      res.status(200).json(incomes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteIncome(req: Request, res: Response): Promise<void> {
    try {
      const incomeId = req.params.incomeId;
      await this.incomeDeleter.run(incomeId);
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