import { Income, IncomePlainData } from '../domain/income';
import { IncomeRepository } from '../domain/income.repository';

export class IncomeCreator {
	constructor(private incomeRepository: IncomeRepository) {}

	async run(incomeData: IncomePlainData): Promise<Income> {
		const income = Income.fromPlainData(incomeData);
		await this.incomeRepository.save(income);
		return income;
	}
}
