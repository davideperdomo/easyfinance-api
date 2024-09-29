import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { Income, IncomeId, IncomePlainData, IncomeUserId } from '../domain/income';
import { IncomeRepository } from '../domain/income.repository';

export class FirestoreIncomeRepository extends FirestoreRepository implements IncomeRepository {
  private collectionName = 'incomes';

  async save(income: Income): Promise<void> {
    const incomeData = income.toPlainData();
    const filteredData = this.filterUndefinedValues(incomeData);
    await this.createDocument(this.collectionName, filteredData, filteredData.id);
  }

  async findByUserId(userId: IncomeUserId): Promise<Income[]> {
    const incomesData = await this.queryDocuments<IncomePlainData>(this.collectionName, 'userId', userId.value);
    return incomesData.map((data: IncomePlainData) => Income.fromPlainData(data));
  }

  async findById(id: IncomeId): Promise<Income | null> {
    const incomeData = await this.readDocument(this.collectionName, id.value);
    return incomeData ? Income.fromPlainData(incomeData as IncomePlainData) : null;
  }

  async update(income: Income): Promise<Income> {
    const incomeData = income.toPlainData();
    const filteredData = this.filterUndefinedValues(incomeData);
    await this.updateDocument(this.collectionName, filteredData.id, filteredData);
    return Income.fromPlainData(filteredData);
  }

  async delete(id: IncomeUserId): Promise<void> {
    await this.deleteDocument(this.collectionName, id.value);
  }

  private filterUndefinedValues(data: any): any {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
  }
}
