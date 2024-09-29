import { CreditProductId } from '../domain/creditProduct';
import { CreditProductRepository } from '../domain/creditProduct.repository';

export class CreditProductDeleter {
  constructor(private creditProductRepository: CreditProductRepository) {}

  async run(plainCreditProductId: string): Promise<void> {
    const creditProductId = new CreditProductId(plainCreditProductId);
    await this.creditProductRepository.delete(creditProductId);
  }
}
