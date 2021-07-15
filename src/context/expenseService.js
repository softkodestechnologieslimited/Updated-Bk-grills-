import { makeAutoObservable } from "mobx";

export class ExpenseService {
  expenses;

  constructor() {
    makeAutoObservable(this);
    this.expenses = [];
  }

  setExpenses(expense) {
    this.expenses = [...expense];
  }

  addExpense(newExpense) {
    if (!newExpense) throw Error('Please enter valid expense details');
    this.expenses = [...this.expenses, newExpense];
  }

  deleteExpense(expenseId) {
    const expenseIndex = this.expenses.findIndex(expense => expense.id === expenseId);
    if (expenseIndex === -1) return

    const copy = [...this.expenses];
    copy.splice(expenseIndex, 1);
    this.expenses = [...copy];
  }

}

const expenseService = new ExpenseService();

export default expenseService;