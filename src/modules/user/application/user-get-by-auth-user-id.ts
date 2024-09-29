import { AuthUid, User, UserPlainData } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export class UserGetByAuthUserId {
  constructor(private userRepository: UserRepository) {}

  async run(authUid: string): Promise<UserPlainData | null> {
    const userAuthUid = new AuthUid(authUid);
    const user = await this.userRepository.findByAuthUid(userAuthUid);

    return user ? user.toPlainData() : null;
  }
}
