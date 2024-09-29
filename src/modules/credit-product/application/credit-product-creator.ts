import { CreditProduct, CreditProductPlainData } from '../domain/creditProduct';
import { CreditProductRepository } from '../domain/creditProduct.repository';

export class CreditProductCreator {
  constructor(private creditProductRepository: CreditProductRepository) {}

  async run(creditProductData: CreditProductPlainData): Promise<CreditProductPlainData> {
    const creditProduct = CreditProduct.fromPlainData(creditProductData);
    await this.creditProductRepository.save(creditProduct);
    
    return creditProduct.toPlainData();
  }
}
