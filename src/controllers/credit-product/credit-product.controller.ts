import { Request, Response } from 'express';
import { CreditProductGetter } from '../../modules/credit-product/application/credit-product-get-by-user';
import { CreditProductCreator } from '../../modules/credit-product/application/credit-product-creator';
import { CreditProductDeleter } from '../../modules/credit-product/application/credit-product-deleter';
export class CreditProductController {
  constructor(
    private creditProductGetter: CreditProductGetter,
    private creditProductCreator: CreditProductCreator,
    private creditProductDeleter: CreditProductDeleter
  ) {}

  async getCreditProductsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const creditProducts = await this.creditProductGetter.run(userId);
      res.status(200).json(creditProducts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async createCreditProduct(req: Request, res: Response): Promise<void> {
    try {
      const creditProductData = req.body;
      const creditProduct = await this.creditProductCreator.run(creditProductData);
      res.status(201).json(creditProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteCreditProduct(req: Request, res: Response): Promise<void> {
    try {
      const creditProductId = req.params.creditProductId;
      await this.creditProductDeleter.run(creditProductId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
