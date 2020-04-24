import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transactions => {
        return transactions.type === 'income';
      })
      .reduce((incomeOperetion, transactions) => {
        return transactions.value + incomeOperetion;
      }, 0);
    const outcome = this.transactions
      .filter(transactions => {
        return transactions.type === 'outcome';
      })
      .reduce((outcomeOperation, transactions) => {
        return transactions.value + outcomeOperation;
      }, 0);
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
