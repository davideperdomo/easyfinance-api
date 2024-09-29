import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { CreditProduct, CreditProductId, CreditProductPlainData, UserId } from '../domain/creditProduct';
import { CreditProductRepository } from '../domain/creditProduct.repository';

export class FirestoreCreditProductRepository extends FirestoreRepository implements CreditProductRepository {
  private collectionName = 'creditProducts';

  async save(creditProduct: CreditProduct): Promise<void> {
    const creditProductData = creditProduct.toPlainData();
    await this.createDocument(this.collectionName, creditProductData, creditProductData.id);
  }

  async findByUserId(userId: UserId): Promise<CreditProduct[]> {
    const creditProductsData = await this.queryDocuments<CreditProductPlainData>(this.collectionName, 'userId', userId.value);
    return creditProductsData.map((data: CreditProductPlainData) => CreditProduct.fromPlainData(data));
  }

  async findById(id: CreditProductId): Promise<CreditProduct | null> {
    const creditProductData = await this.readDocument(this.collectionName, id.value);
    return creditProductData ? CreditProduct.fromPlainData(creditProductData as CreditProductPlainData) : null;
  }

  async update(creditProduct: CreditProduct): Promise<CreditProduct> {
    const creditProductData = creditProduct.toPlainData();
    await this.updateDocument(this.collectionName, creditProductData.id, creditProductData);
    return CreditProduct.fromPlainData(creditProductData);
  }

  async delete(id: CreditProductId): Promise<void> {
    await this.deleteDocument(this.collectionName, id.value);
  }
}
