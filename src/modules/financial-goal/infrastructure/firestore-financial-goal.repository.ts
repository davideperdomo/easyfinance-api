import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { FinancialGoal, FinancialGoalId, FinancialGoalPlainData, UserId } from '../domain/financial-goal';
import { FinancialGoalRepository } from '../domain/financial-goal.repository';

export class FirestoreFinancialGoalRepository extends FirestoreRepository implements FinancialGoalRepository {
  private collectionName = 'financialGoals';

  async save(financialGoal: FinancialGoal): Promise<void> {
    const financialGoalData = financialGoal.toPlainData();
    await this.createDocument(this.collectionName, financialGoalData, financialGoalData.id);
  }

  async findByUserId(userId: UserId): Promise<FinancialGoal[]> {
    const financialGoalsData = await this.queryDocuments<FinancialGoalPlainData>(this.collectionName, 'userId', userId.value);
    return financialGoalsData.map((data: FinancialGoalPlainData) => FinancialGoal.fromPlainData(data));
  }

  async findById(id: FinancialGoalId): Promise<FinancialGoal | null> {
    const financialGoalData = await this.readDocument(this.collectionName, id.value);
    return financialGoalData ? FinancialGoal.fromPlainData(financialGoalData as FinancialGoalPlainData) : null;
  }

  async update(financialGoal: FinancialGoal): Promise<FinancialGoal> {
    const financialGoalData = financialGoal.toPlainData();
    await this.updateDocument(this.collectionName, financialGoalData.id, financialGoalData);
    return FinancialGoal.fromPlainData(financialGoalData);
  }

  async delete(id: FinancialGoalId): Promise<void> {
    await this.deleteDocument(this.collectionName, id.value);
  }
}
