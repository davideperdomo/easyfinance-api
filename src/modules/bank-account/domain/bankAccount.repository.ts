import { BankAccount, BankAccountId, BankAccountUserId } from '../domain/bankAccount';

export interface BankAccountRepository {
  save(bankAccount: BankAccount): Promise<void>;
  findByUserId(userId: BankAccountUserId): Promise<BankAccount[]>;
  findById(id: BankAccountId): Promise<BankAccount | null>;
  update(bankAccount: BankAccount): Promise<BankAccount>;
  delete(id: BankAccountId): Promise<void>;
}
