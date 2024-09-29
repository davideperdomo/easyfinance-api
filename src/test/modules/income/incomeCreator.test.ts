import { IncomeCreator } from '../../../modules/income/application/incomeCreator';
import { IncomeRepository } from '../../../modules/income/domain/income.repository';
import { Income, IncomePlainData } from '../../../modules/income/domain/income';

describe('IncomeCreator', () => {
    let incomeRepository: IncomeRepository;
    let incomeCreator: IncomeCreator;

    beforeEach(() => {
        incomeRepository = {
            save: jest.fn(),
            findById: jest.fn(),
        };
        incomeCreator = new IncomeCreator(incomeRepository);
    });

    it('should create an income and save it', async () => {
        const incomeData: IncomePlainData = {
            id: '1',
            amount: 1000,
            frequency: 'monthly',
            userId: '1',
        };

        const income = await incomeCreator.run(incomeData);

        expect(incomeRepository.save).toHaveBeenCalledWith(income);
        expect(income).toBeInstanceOf(Income);
    });
});
