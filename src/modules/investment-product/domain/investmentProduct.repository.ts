import { InvestmentProduct, InvestmentProductId } from '../domain/investmentProduct';

export interface InvestmentProductRepository {
  save(investmentProduct: InvestmentProduct): Promise<void>;
  findByUserId(userId: string): Promise<InvestmentProduct[]>;
}
