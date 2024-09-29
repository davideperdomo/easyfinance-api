import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './controllers/user/user.routes';
import incomeRoutes from './controllers/income/income.routes';
import expenseRoutes from './controllers/expense/expense.routes';
import bankAccountRoutes from './controllers/bankAccount/bankAccount.routes';
import creditProductRoutes from './controllers/credit-product/credit-product.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(incomeRoutes);
app.use(expenseRoutes);
app.use(bankAccountRoutes);
app.use(creditProductRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
