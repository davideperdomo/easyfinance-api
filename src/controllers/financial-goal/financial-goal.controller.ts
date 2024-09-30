import { Request, Response } from 'express';
import { FinancialGoalCreator } from '../../modules/financial-goal/application/financial-goal-creator';
import { FinancialGoalCalculator } from '../../modules/financial-goal/application/financial-goal-calculator';

export class FinancialGoalController {
  constructor(
    private financialGoalCreator: FinancialGoalCreator,
    private financialGoalCalculator: FinancialGoalCalculator
  ) {}

  async calculateFinancialGoal(req: Request, res: Response): Promise<void> {
    try {
      const financialGoalData = req.body;
      const financialGoal = await this.financialGoalCalculator.run(financialGoalData);
      res.status(200).json(financialGoal);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message }); 
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

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
