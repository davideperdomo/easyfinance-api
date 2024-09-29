import { FinancialGoal, FinancialGoalId, UserId } from "./financial-goal";

export interface FinancialGoalRepository {
  save(financialGoal: FinancialGoal): Promise<void>;
  findByUserId(userId: UserId): Promise<FinancialGoal[]>;
  update(financialGoal: FinancialGoal): Promise<FinancialGoal>;
  delete(FinancialGoalId: FinancialGoalId): Promise<void>;
}