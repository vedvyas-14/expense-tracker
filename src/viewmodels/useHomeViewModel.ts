import { useCallback, useEffect, useMemo, useState } from 'react';
import { transactionRepository } from '../data/transactionRepository';
import {
  expensesByCategory,
  filterByCategory,
  getTotals,
  sortByDateDesc,
} from '../model/transactionCalculations';
import { NewTransaction, Transaction } from '../model/types';

export function useHomeViewModel() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    transactionRepository
      .getAll()
      .then(setTransactions)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      transactionRepository.saveAll(transactions);
    }
  }, [transactions, isLoading]);

  const addTransaction = useCallback((t: NewTransaction) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setTransactions((prev) => [{ ...t, id }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const chartData = useMemo(() => expensesByCategory(transactions), [transactions]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(transactions.map((t) => t.category)))],
    [transactions]
  );

  const activeCategory = categories.includes(selectedCategory) ? selectedCategory : 'All';

  const visibleTransactions = useMemo(
    () => sortByDateDesc(filterByCategory(transactions, activeCategory)),
    [transactions, activeCategory]
  );

  return {
    isLoading,
    totals,
    chartData,
    categories,
    selectedCategory: activeCategory,
    selectCategory: setSelectedCategory,
    transactions: visibleTransactions,
    hasTransactions: transactions.length > 0,
    addTransaction,
    deleteTransaction,
  };
}