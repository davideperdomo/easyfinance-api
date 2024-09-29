import { Income, IncomeId, IncomeUserId } from '../domain/income';

export interface IncomeRepository {
  save(income: Income): Promise<void>;
  findById(id: IncomeId): Promise<Income | null>;
  findByUserId(id: IncomeUserId): Promise<Income[]>;
  update(income: Income): Promise<Income>;
  delete(id: IncomeUserId): Promise<void>;
}
