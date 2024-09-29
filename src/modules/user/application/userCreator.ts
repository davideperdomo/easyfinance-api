import { User, UserPlainData } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export class UserCreator {
    constructor(private userRepository: UserRepository) {}

    async run(userData: UserPlainData): Promise<User> {
        const user = User.fromPlainData(userData);
        await this.userRepository.save(user);
        return user;
    }
}
