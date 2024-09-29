import { Router } from 'express';
import { IncomeController } from './income.controller';
import { IncomeCreator } from '../../modules/income/application/incomeCreator';
import { IncomeGetByUserId } from '../../modules/income/application/incomeGetByUserId';
import { IncomeDeleter } from '../../modules/income/application/income-deleter';
import { FirestoreIncomeRepository } from '../../modules/income/infrastructure/firestoreIncome.repository';

const router = Router();

const incomeRepository = new FirestoreIncomeRepository();
const incomeController = new IncomeController(
  new IncomeCreator(incomeRepository),
  new IncomeGetByUserId(incomeRepository),
  new IncomeDeleter(incomeRepository),
);

router.post('/api/incomes', (req, res) => incomeController.createIncome(req, res));
router.get('/api/users/:userId/incomes', (req, res) => incomeController.getByUserId(req, res));
router.delete('/api/incomes/:incomeId', (req, res) => incomeController.deleteIncome(req, res));

export default router;
