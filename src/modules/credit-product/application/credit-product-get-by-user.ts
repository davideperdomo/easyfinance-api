import { CreditProductPlainData, UserId } from '../domain/creditProduct';
import { CreditProductRepository } from '../domain/creditProduct.repository';

export class CreditProductGetter {
  constructor(private creditProductRepository: CreditProductRepository) {}

  async run(plainUserId: string): Promise<CreditProductPlainData[]> {
    const userId = new UserId(plainUserId);
    const creditProducts = await this.creditProductRepository.findByUserId(userId);
    
    return creditProducts.map((creditProduct) => creditProduct.toPlainData());
  }
}
