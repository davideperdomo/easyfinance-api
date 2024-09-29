import { FinancialGoalPlainData } from '../domain/financial-goal';
import { FinancialGoalRepository } from '../domain/financial-goal.repository';
import { FinancialGoalService } from '../domain/financial-goal.service';

export interface FinancialGoalCreatorParams {
  id: string;
  userId: string;
  name: string;
  criteria: string;
  goalAmount: number;
  monthlyPercentage?: number;
  goalTermDate?: string;
}

export class FinancialGoalCreator {
  constructor(
    private financialGoalService: FinancialGoalService,
    private financialGoalRepository: FinancialGoalRepository
  ) {}

  async run(params: FinancialGoalCreatorParams): Promise<FinancialGoalPlainData> {
    const financialGoal = await this.financialGoalService.generateByCriteria(
      params.id,
      params.name,
      params.userId,
      params.criteria,
      params.goalAmount,
      params.monthlyPercentage,
      params.goalTermDate ? new Date(params.goalTermDate) : undefined
    );
    await this.financialGoalRepository.save(financialGoal);

    return financialGoal.toPlainData();
  }
}
