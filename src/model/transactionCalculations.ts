import { Transaction } from './types';

export interface Totals {
  income: number;
  expense: number;
  balance: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getTotals(transactions: Transaction[]): Totals {
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  }

  return {
    income: round2(income),
    expense: round2(expense),
    balance: round2(income - expense),
  };
}

export function expensesByCategory(transactions: Transaction[]): CategoryTotal[] {
  const totals: Record<string, number> = {};

  for (const t of transactions) {
    if (t.type === 'expense') {
      totals[t.category] = (totals[t.category] ?? 0) + t.amount;
    }
  }

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total: round2(total) }))
    .sort((a, b) => b.total - a.total);
}

export function filterByCategory(transactions: Transaction[], category: string): Transaction[] {
  return category === 'All'
    ? transactions
    : transactions.filter((t) => t.category === category);
}

export function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}