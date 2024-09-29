import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { BankAccount, BankAccountId, BankAccountPlainData, BankAccountUserId } from '../domain/bankAccount';
import { BankAccountRepository } from '../domain/bankAccount.repository';

export class FirestoreBankAccountRepository extends FirestoreRepository implements BankAccountRepository {
  private collectionName = 'bankAccounts';

  async save(bankAccount: BankAccount): Promise<void> {
    const bankAccountData = bankAccount.toPlainData();
    await this.createDocument(this.collectionName, bankAccountData, bankAccountData.id);
  }

  async findByUserId(userId: BankAccountUserId): Promise<BankAccount[]> {
    const bankAccountsData = await this.queryDocuments<BankAccountPlainData>(this.collectionName, 'userId', userId.value);
    return bankAccountsData.map((data: BankAccountPlainData) => BankAccount.fromPlainData(data));
  }

  async findById(id: BankAccountId): Promise<BankAccount | null> {
    const bankAccountData = await this.readDocument(this.collectionName, id.value);
    return bankAccountData ? BankAccount.fromPlainData(bankAccountData as BankAccountPlainData) : null;
  }

  async update(bankAccount: BankAccount): Promise<BankAccount> {
    const bankAccountData = bankAccount.toPlainData();
    await this.updateDocument(this.collectionName, bankAccountData.id, bankAccountData);
    return BankAccount.fromPlainData(bankAccountData);
  }

  async delete(id: BankAccountId): Promise<void> {
    await this.deleteDocument(this.collectionName, id.value);
  }
}
