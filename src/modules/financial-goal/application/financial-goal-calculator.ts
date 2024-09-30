import { FinancialGoalPlainData } from '../domain/financial-goal';
import { FinancialGoalRepository } from '../domain/financial-goal.repository';
import { FinancialGoalService } from '../domain/financial-goal.service';

export interface FinancialGoalCalculatorParams {
  id: string;
  userId: string;
  name: string;
  criteria: string;
  goalAmount: number;
  monthlyPercentage?: number;
  goalTermDate?: string;
}

export class FinancialGoalCalculator {
  constructor(
    private financialGoalService: FinancialGoalService
  ) {}

  async run(params: FinancialGoalCalculatorParams): Promise<FinancialGoalPlainData> {
    const financialGoal = await this.financialGoalService.generateByCriteria(
      params.id,
      params.name,
      params.userId,
      params.criteria,
      params.goalAmount,
      params.monthlyPercentage,
      params.goalTermDate ? new Date(params.goalTermDate) : undefined
    );

    return financialGoal.toPlainData();
  }
}
