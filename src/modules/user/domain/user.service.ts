import { IncomeService } from '../../income/domain/income.service';
import { ExpenseService } from '../../expense/domain/expense.service';
import { UserId } from './user';

export class UserService {
  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {}

  async calculateTotalUserIncome(userId: UserId): Promise<number> {
    return this.incomeService.calculateTotalUserIncome(userId.value);
  }

  async calculateTotalUserExpense(userId: UserId): Promise<number> {
    return this.expenseService.calculateTotalUserExpense(userId.value);
  }

  async calculateBalanceByFrequency(
    plainUserId: string,
    frequency: 'monthly' = 'monthly'
  ): Promise<number> {
    const userId = new UserId(plainUserId);
    const totalIncome = await this.calculateTotalUserIncome(userId);
    const totalExpense = await this.calculateTotalUserExpense(userId);
    return totalIncome - totalExpense;
  }
}
