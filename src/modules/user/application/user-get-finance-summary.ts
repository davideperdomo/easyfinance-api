import { ExpenseService } from '../../expense/domain/expense.service';
import { IncomeService } from '../../income/domain/income.service';
import { UserId } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export class UserGetFinanceSummary {
  constructor(
    private userRepository: UserRepository,
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {}

  async run(plainUserId: string): Promise<UserFinanceSummary | null> {
    const userId = new UserId(plainUserId);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    const totalIncome = await this.incomeService.calculateTotalUserIncome(userId.value);
    const totalExpense = await this.expenseService.calculateTotalUserExpense(userId.value);

    return {
      userId: user.id.value,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    };
  }
}

interface UserFinanceSummary {
  userId: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
