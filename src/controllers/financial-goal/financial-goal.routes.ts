import { Router } from 'express';
import { ExpenseService } from '../../modules/expense/domain/expense.service';
import { FirestoreExpenseRepository } from '../../modules/expense/infrastructure/firestoreExpense.repository';
import { FinancialGoalCreator } from '../../modules/financial-goal/application/financial-goal-creator';
import { FinancialGoalService } from '../../modules/financial-goal/domain/financial-goal.service';
import { FirestoreFinancialGoalRepository } from '../../modules/financial-goal/infrastructure/firestore-financial-goal.repository';
import { IncomeService } from '../../modules/income/domain/income.service';
import { FirestoreIncomeRepository } from '../../modules/income/infrastructure/firestoreIncome.repository';
import { UserService } from '../../modules/user/domain/user.service';
import { FinancialGoalController } from './financial-goal.controller';
import { FinancialGoalCalculator } from '../../modules/financial-goal/application/financial-goal-calculator';

const router = Router();

const financialGoalRepository = new FirestoreFinancialGoalRepository();
const incomeService = new IncomeService(new FirestoreIncomeRepository());
const expenseService = new ExpenseService(new FirestoreExpenseRepository());
const userService = new UserService(incomeService, expenseService);
const financialGoalService = new FinancialGoalService(userService);
const financialGoalController = new FinancialGoalController(
  new FinancialGoalCreator(financialGoalService, financialGoalRepository),
  new FinancialGoalCalculator(financialGoalService)
);

router.post('/api/financial-goals', (req, res) => financialGoalController.createFinancialGoal(req, res));
router.post('/api/financial-goals/calculate', (req, res) => financialGoalController.calculateFinancialGoal(req, res));

export default router;
