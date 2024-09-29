import { BankAccount, BankAccountId } from '../domain/bankAccount';
import { BankAccountRepository } from '../domain/bankAccount.repository';

export class BankAccountDeleter {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async run(bankAccountId: string): Promise<void> {
    const bankAccountIdObj = new BankAccountId(bankAccountId);
    await this.bankAccountRepository.delete(bankAccountIdObj);
  }
}
