import { Request, Response } from 'express';
import { UserCreator } from '../../modules/user/application/userCreator';
import { UserGetByAuthUserId } from '../../modules/user/application/user-get-by-auth-user-id';
import { UserGetFinanceSummary } from '../../modules/user/application/user-get-finance-summary';

export class UserController {
  constructor(
    private userCreator: UserCreator,
    private userGetByAuthUserId: UserGetByAuthUserId,
    private userGetFinanceSummary: UserGetFinanceSummary
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const user = await this.userCreator.run(userData);
      res.status(201).json(user.toPlainData());
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getUserByAuthUid(req: Request, res: Response): Promise<void> {
    try {
      const { authUid } = req.query;
      const user = await this.userGetByAuthUserId.run(String(authUid));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getUserFinanceSummary(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const financeSummary = await this.userGetFinanceSummary.run(String(userId));
      if (financeSummary) {
        res.status(200).json(financeSummary);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
