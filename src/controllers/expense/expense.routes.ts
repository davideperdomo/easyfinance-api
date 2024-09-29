import { Router } from 'express';
import { ExpenseController } from './expense.controller';
import { ExpenseCreator } from '../../modules/expense/application/expenseCreator';
import { ExpenseGetByUserId } from '../../modules/expense/application/expenseGetByUserId';
import { ExpenseDeleter } from '../../modules/expense/application/expense-deleter';
import { FirestoreExpenseRepository } from '../../modules/expense/infrastructure/firestoreExpense.repository';

const router = Router();

const expenseRepository = new FirestoreExpenseRepository();
const expenseController = new ExpenseController(
  new ExpenseCreator(expenseRepository),
  new ExpenseGetByUserId(expenseRepository),
  new ExpenseDeleter(expenseRepository)
);

router.post('/api/expenses', (req, res) => expenseController.createExpense(req, res));
router.get('/api/users/:userId/expenses', (req, res) => expenseController.getByUserId(req, res));
router.delete('/api/expenses/:expenseId', (req, res) => expenseController.deleteExpense(req, res));

export default router;
