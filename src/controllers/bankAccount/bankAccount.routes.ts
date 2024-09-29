import { Router } from 'express';
import { BankAccountController } from './bankAccount.controller';
import { BankAccountGetter } from '../../modules/bank-account/application/bankAccountGetByUserId';
import { FirestoreBankAccountRepository } from '../../modules/bank-account/infrastructure/firestoreBankAccount.repository';
import { BankAccountCreator } from '../../modules/bank-account/application/bankAccountCreator';
import { BankAccountDeleter } from '../../modules/bank-account/application/bank-account-deleter';
import { BankAccountBalanceUpdater } from '../../modules/bank-account/application/bank-account-balance-updater';

const router = Router();

const bankAccountRepository = new FirestoreBankAccountRepository();
const bankAccountController = new BankAccountController(
  new BankAccountGetter(bankAccountRepository),
  new BankAccountCreator(bankAccountRepository),
  new BankAccountDeleter(bankAccountRepository),
  new BankAccountBalanceUpdater(bankAccountRepository)
);

router.post('/api/bank-accounts', (req, res) => bankAccountController.createBankAccount(req, res));
router.get('/api/users/:userId/bank-accounts', (req, res) => bankAccountController.getBankAccountsByUserId(req, res));
router.delete('/api/bank-accounts/:bankAccountId', (req, res) => bankAccountController.deleteBankAccount(req, res));
router.put('/api/bank-accounts/:bankAccountId/balance', (req, res) => bankAccountController.updateBankAccountBalance(req, res));

export default router;
