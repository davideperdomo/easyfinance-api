import { CreditProduct, CreditProductId, UserId } from './creditProduct';

export interface CreditProductRepository {
  save(creditProduct: CreditProduct): Promise<void>;
  findByUserId(userId: UserId): Promise<CreditProduct[]>;
  findById(id: CreditProductId): Promise<CreditProduct | null>;
  update(creditProduct: CreditProduct): Promise<CreditProduct>;
  delete(id: CreditProductId): Promise<void>;
}
