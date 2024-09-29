import { Router } from 'express';
import { UserController } from './user.controller';
import { UserCreator } from '../../modules/user/application/userCreator';
import { UserGetByAuthUserId } from '../../modules/user/application/user-get-by-auth-user-id';
import { FirestoreUserRepository } from '../../modules/user/infrastructure/firestoreUser.repository';
import { IncomeService } from '../../modules/income/domain/income.service';
import { ExpenseService } from '../../modules/expense/domain/expense.service';
import { FirestoreIncomeRepository } from '../../modules/income/infrastructure/firestoreIncome.repository';
import { FirestoreExpenseRepository } from '../../modules/expense/infrastructure/firestoreExpense.repository';
import { UserGetFinanceSummary } from '../../modules/user/application/user-get-finance-summary';

const router = Router();

const userRepository = new FirestoreUserRepository();
const incomeService = new IncomeService(new FirestoreIncomeRepository());
const expenseService = new ExpenseService(new FirestoreExpenseRepository());

const userController = new UserController(
  new UserCreator(userRepository),
  new UserGetByAuthUserId(userRepository),
  new UserGetFinanceSummary(userRepository, incomeService, expenseService)
);

router.post('/api/users', (req, res) => userController.createUser(req, res));
router.get('/api/users', (req, res) => userController.getUserByAuthUid(req, res));
router.get('/api/users/:userId/finance-summary', (req, res) => userController.getUserFinanceSummary(req, res));

export default router;
