import { Request, Response } from 'express';
import { FinancialGoalCreator } from '../../modules/financial-goal/application/financial-goal-creator';

export class FinancialGoalController {
  constructor(private financialGoalCreator: FinancialGoalCreator) {}

  async createFinancialGoal(req: Request, res: Response): Promise<void> {
    try {
      const financialGoalData = req.body;
      const financialGoal = await this.financialGoalCreator.run(financialGoalData);
      res.status(201).json(financialGoal);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
