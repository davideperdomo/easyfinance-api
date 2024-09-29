import { FirestoreRepository } from '../../../shared/infrastructure/persistence/firestore.repository';
import { AuthUid, User, UserId, UserPlainData } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export class FirestoreUserRepository extends FirestoreRepository implements UserRepository {
  private collectionName = 'users';

  async save(user: User): Promise<void> {
    const userData = user.toPlainData();
    await this.createDocument(this.collectionName, userData, userData.id);
  }

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.readDocument(this.collectionName, id.value);
    return userData ? User.fromPlainData(userData as UserPlainData) : null;
  }

  async findByAuthUid(authUid: AuthUid): Promise<User | null> {
    const userData = await this.queryDocuments(this.collectionName, 'authUid', authUid.value);
    return userData ? User.fromPlainData(userData[0] as UserPlainData) : null;
  }
}
