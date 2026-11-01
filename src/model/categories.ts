import { TransactionType } from './types';

export const CATEGORIES: Record<TransactionType, string[]> = {
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
  income: ['Salary', 'Freelance', 'Gift', 'Investment', 'Other'],
};