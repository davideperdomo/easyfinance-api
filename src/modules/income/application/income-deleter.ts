import { IncomeUserId } from '../domain/income';
import { IncomeRepository } from '../domain/income.repository';

export class IncomeDeleter {
  constructor(private incomeRepository: IncomeRepository) {}

  async run(incomeId: string): Promise<void> {
    const incomeUserId = new IncomeUserId(incomeId);
    await this.incomeRepository.delete(incomeUserId);
  }
}
