import { BankAccountPlainData, BankAccountUserId } from "../domain/bankAccount";
import { BankAccountRepository } from "../domain/bankAccount.repository";

export class BankAccountGetter {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async run(plainUserId: string): Promise<BankAccountPlainData[]> {
    const userId = new BankAccountUserId(plainUserId);
    const bankAccounts = await this.bankAccountRepository.findByUserId(userId);
    
    return bankAccounts.map((bankAccount) => bankAccount.toPlainData());
  }
}

