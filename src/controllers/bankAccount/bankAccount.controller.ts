import { Request, Response } from 'express';
import { BankAccountGetter } from '../../modules/bank-account/application/bankAccountGetByUserId';
import { BankAccountCreator } from '../../modules/bank-account/application/bankAccountCreator';
import { BankAccountDeleter } from '../../modules/bank-account/application/bank-account-deleter';
import { BankAccountBalanceUpdater } from '../../modules/bank-account/application/bank-account-balance-updater';

export class BankAccountController {
  constructor(
    private bankAccountGetter: BankAccountGetter,
    private bankAccountCreator: BankAccountCreator,
    private bankAccountDeleter: BankAccountDeleter,
    private bankAccountBalanceUpdater: BankAccountBalanceUpdater
  ) {}

  async getBankAccountsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const bankAccounts = await this.bankAccountGetter.run(userId);
      res.status(200).json(bankAccounts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async createBankAccount(req: Request, res: Response): Promise<void> {
    try {
      const bankAccountData = req.body;
      const bankAccount = await this.bankAccountCreator.run(bankAccountData);
      res.status(201).json(bankAccount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteBankAccount(req: Request, res: Response): Promise<void> {
    try {
      const bankAccountId = req.params.bankAccountId;
      await this.bankAccountDeleter.run(bankAccountId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async updateBankAccountBalance(req: Request, res: Response): Promise<void> {
    try {
      const bankAccountId = req.params.bankAccountId;
      const { balance } = req.body;
      const updatedBankAccount = await this.bankAccountBalanceUpdater.run(bankAccountId, balance);
      res.status(200).json(updatedBankAccount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
