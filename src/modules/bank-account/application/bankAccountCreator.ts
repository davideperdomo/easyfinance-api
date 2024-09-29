import { BankAccount, BankAccountPlainData } from '../domain/bankAccount';
import { BankAccountRepository } from '../domain/bankAccount.repository';

export class BankAccountCreator {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async run(bankAccountData: BankAccountPlainData): Promise<BankAccountPlainData> {
    const bankAccount = BankAccount.fromPlainData(bankAccountData);
    await this.bankAccountRepository.save(bankAccount);
    
    return bankAccount.toPlainData();
  }
}
