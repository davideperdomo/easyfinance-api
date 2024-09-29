import { Balance, BankAccount, BankAccountId, BankAccountPlainData } from '../domain/bankAccount';
import { BankAccountRepository } from '../domain/bankAccount.repository';

export class BankAccountBalanceUpdater {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async run(plainBankAccountId: string, balance: number): Promise<BankAccountPlainData> {
    const bankAccountId = new BankAccountId(plainBankAccountId);
    const bankAccount = await this.bankAccountRepository.findById(bankAccountId);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }
    bankAccount.balance = new Balance(balance);
    const updatedBankAccount = await this.bankAccountRepository.update(bankAccount);
    
    return updatedBankAccount.toPlainData();
  }
}
