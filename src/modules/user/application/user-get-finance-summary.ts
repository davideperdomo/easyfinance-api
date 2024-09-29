import { ExpenseService } from '../../expense/domain/expense.service';
import { IncomeService } from '../../income/domain/income.service';
import { UserId } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserService } from '../domain/user.service';

export class UserGetFinanceSummary {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) {}

  async run(plainUserId: string): Promise<UserFinanceSummary | null> {
    const userId = new UserId(plainUserId);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    const totalIncome = await this.userService.calculateTotalUserIncome(userId);
    const totalExpense = await this.userService.calculateTotalUserExpense(userId);
    const balance = await this.userService.calculateBalanceByFrequency(userId.value);
    
    return {
      userId: user.id.value,
      totalIncome,
      totalExpense,
      balance
    };
  }
}

interface UserFinanceSummary {
  userId: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
