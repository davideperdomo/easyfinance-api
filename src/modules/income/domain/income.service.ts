import { IncomeRepository } from './income.repository';
import { IncomeUserId } from './income';

export class IncomeService {
  constructor(private incomeRepository: IncomeRepository) {}

  async calculateTotalUserIncome(plainUserId: string): Promise<number> {
    const userId = new IncomeUserId(plainUserId);
    const incomes = await this.incomeRepository.findByUserId(userId);
    return incomes.reduce((total, income) => total + income.amount.value, 0);
  }
}
