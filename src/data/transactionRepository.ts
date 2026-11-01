import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../model/types';

const STORAGE_KEY = '@expense_tracker/transactions';

export const transactionRepository = {
  async getAll(): Promise<Transaction[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Transaction[]) : [];
    } catch (e) {
      console.warn('Failed to load transactions', e);
      return [];
    }
  },

  async saveAll(transactions: Transaction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to save transactions', e);
    }
  },
};