import { AuthUid, User, UserId } from '../domain/user';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByAuthUid(authUid: AuthUid): Promise<User | null>;
}
