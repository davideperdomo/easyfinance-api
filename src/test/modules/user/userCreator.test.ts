import { UserCreator } from '../../../modules/user/application/userCreator';
import { UserRepository } from '../../../modules/user/domain/user.repository';
import { User, UserPlainData } from '../../../modules/user/domain/user';

describe('UserCreator', () => {
    let userRepository: UserRepository;
    let userCreator: UserCreator;

    beforeEach(() => {
        userRepository = {
            save: jest.fn(),
            findById: jest.fn(),
        };
        userCreator = new UserCreator(userRepository);
    });

    it('should create a user and save it', async () => {
        const userData: UserPlainData = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const user = await userCreator.run(userData);

        expect(userRepository.save).toHaveBeenCalledWith(user);
        expect(user).toBeInstanceOf(User);
    });
});
