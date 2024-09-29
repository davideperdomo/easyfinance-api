export interface InvestmentProductPlainData {
  id: string;
  type: string;
  amount: number;
  term: string;
  interestRate: number;
  userId: string;
  associatedExpenseId?: string;
}

export class InvestmentProduct {
  constructor(
    public id: InvestmentProductId,
    public type: string,
    public amount: Amount,
    public term: Term,
    public interestRate: InterestRate,
    public userId: UserId,
    public associatedExpenseId?: ExpenseId
  ) {}

  static fromPlainData(data: InvestmentProductPlainData): InvestmentProduct {
    return new InvestmentProduct(
      new InvestmentProductId(data.id),
      data.type,
      new Amount(data.amount),
      new Term(data.term),
      new InterestRate(data.interestRate),
      new UserId(data.userId),
      data.associatedExpenseId ? new ExpenseId(data.associatedExpenseId) : undefined
    );
  }

  toPlainData(): InvestmentProductPlainData {
    return {
      id: this.id.value,
      type: this.type,
      amount: this.amount.value,
      term: this.term.time,
      interestRate: this.interestRate.percentage,
      userId: this.userId.value,
      associatedExpenseId: this.associatedExpenseId?.value
    };
  }
}

export class InvestmentProductId {
  constructor(public value: string) {}
}

export class Amount {
  constructor(public value: number) {}
}

export class Term {
  constructor(public time: string) {}
}

export class InterestRate {
  constructor(public percentage: number) {}
}

export class UserId {
  constructor(public value: string) {}
}

export class ExpenseId {
  constructor(public value: string) {}
}
