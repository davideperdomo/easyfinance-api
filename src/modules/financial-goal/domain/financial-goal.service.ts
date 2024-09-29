import { UserService } from '../../user/domain/user.service';
import { FinancialGoal, FinancialGoalCalculationCriteria, FinancialGoalPlainData } from './financial-goal';

export class FinancialGoalService {
  constructor(private userService: UserService) {}

  async generateByCriteria(
    financeGoalId: string,
    name: string,
    userId: string,
    criteria: string,
    goalAmount: number,
    monthlyPercentage?: number,
    goalTermDate?: Date
  ): Promise<FinancialGoal> {
    const monthlyBalance = await this.userService.calculateBalanceByFrequency(userId, 'monthly');
    console.log({ monthlyBalance });
    const startDate = new Date();
    console.log({ startDate });
    const plainFinancialGoal: FinancialGoalPlainData = {
      id: financeGoalId,
      name: name,
      goalAmount: goalAmount,
      calculationCriteria: criteria,
      startDate: startDate.toISOString(),
      userId: userId,
      monthlyAmount: 0
    };
    console.log({ plainFinancialGoal });
    const financialCriteria = new FinancialGoalCalculationCriteria(criteria);
    if (
      financialCriteria.value === FinancialGoalCalculationCriteria.criterias.percentage
      && monthlyPercentage
    ) {
      const monthlyAmount = Number(monthlyBalance) * Number(monthlyPercentage);
      const goalTermMonths = Number(goalAmount) / Number(monthlyAmount);
      const goalTermDate = startDate.setMonth(startDate.getMonth() + goalTermMonths);
      console.log({ monthlyAmount, goalTermMonths, goalTermDate });
      plainFinancialGoal.monthlyAmount = monthlyAmount;
      plainFinancialGoal.goalTerm = new Date(goalTermDate).toISOString();
      plainFinancialGoal.monthlyPercentage = monthlyPercentage;
    };
    if (
      financialCriteria.value === FinancialGoalCalculationCriteria.criterias.date
      && goalTermDate
    ) {
      console.log({ goalTermDate });
      console.log(goalTermDate.getMonth());
      console.log(startDate.getMonth());
      const goalTermMonths = goalTermDate.getMonth() - startDate.getMonth();
      const monthlyAmount = Number(goalAmount) / Number(goalTermMonths);
      const monthlyPercentage = monthlyAmount / Number(monthlyBalance);
      console.log({ goalTermMonths, monthlyAmount, monthlyPercentage });
      plainFinancialGoal.monthlyAmount = monthlyAmount;
      plainFinancialGoal.monthlyPercentage = monthlyPercentage;
      plainFinancialGoal.goalTerm = goalTermDate.toISOString();
    }
    console.log({ plainFinancialGoal });
    const financialGoal = FinancialGoal.fromPlainData(plainFinancialGoal);
  
    return financialGoal;
  }
}
