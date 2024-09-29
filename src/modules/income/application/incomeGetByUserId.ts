import { IncomePlainData, IncomeUserId } from '../domain/income';
import { IncomeRepository } from '../domain/income.repository';

export class IncomeGetByUserId {
  constructor(private incomeRepository: IncomeRepository) {}

  async run(userId: string): Promise<IncomePlainData[]> {
    const incomeUserId = new IncomeUserId(userId);
    const incomes = await this.incomeRepository.findByUserId(incomeUserId);
    
    return incomes.map((income) => income.toPlainData());
  }
}
