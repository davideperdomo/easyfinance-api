import { Router } from 'express';
import { CreditProductCreator } from '../../modules/credit-product/application/credit-product-creator';
import { CreditProductDeleter } from '../../modules/credit-product/application/credit-product-deleter';
import { CreditProductGetter } from '../../modules/credit-product/application/credit-product-get-by-user';
import { FirestoreCreditProductRepository } from '../../modules/credit-product/infrastructure/firestore-credit-product.repository';
import { CreditProductController } from './credit-product.controller';

const router = Router();

const creditProductRepository = new FirestoreCreditProductRepository();
const creditProductController = new CreditProductController(
  new CreditProductGetter(creditProductRepository),
  new CreditProductCreator(creditProductRepository),
  new CreditProductDeleter(creditProductRepository)
);

router.post('/api/credit-products', (req, res) => creditProductController.createCreditProduct(req, res));
router.get('/api/users/:userId/credit-products', (req, res) => creditProductController.getCreditProductsByUserId(req, res));
router.delete('/api/credit-products/:creditProductId', (req, res) => creditProductController.deleteCreditProduct(req, res));

export default router;
