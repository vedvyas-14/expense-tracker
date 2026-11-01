import { useCallback, useState } from 'react';
import { CATEGORIES } from '../model/categories';
import { NewTransaction, TransactionType } from '../model/types';

// Keeps only digits and one decimal point, with at most 2 decimals.
function sanitizeAmount(input: string): string {
  const cleaned = input.replace(',', '.').replace(/[^0-9.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  if (rest.length === 0) return whole;
  return `${whole}.${rest.join('').slice(0, 2)}`;
}

export function useAddTransactionViewModel(onSubmit: (t: NewTransaction) => void) {
  const [type, setTypeState] = useState<TransactionType>('expense');
  const [amount, setAmountState] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Income and expense have different categories, so switching clears the choice.
  const setType = useCallback((next: TransactionType) => {
    setTypeState(next);
    setCategory('');
    setError('');
  }, []);

  const setAmount = useCallback((value: string) => {
    setAmountState(sanitizeAmount(value));
    setError('');
  }, []);

  const reset = useCallback(() => {
    setTypeState('expense');
    setAmountState('');
    setCategory('');
    setDate(new Date());
    setDescription('');
    setError('');
  }, []);

  // Returns true on success so the View knows when to close the modal.
  const submit = useCallback((): boolean => {
    const value = parseFloat(amount);

    if (!value || value <= 0) {
      setError('Enter an amount greater than 0.');
      return false;
    }
    if (!category) {
      setError('Please select a category.');
      return false;
    }

    onSubmit({
      type,
      amount: Math.round(value * 100) / 100,
      category,
      date: date.toISOString(),
      description: description.trim(),
    });
    reset();
    return true;
  }, [amount, category, type, date, description, onSubmit, reset]);

  return {
    type,
    amount,
    category,
    date,
    description,
    error,
    availableCategories: CATEGORIES[type],
    
    setType,
    setAmount,
    setCategory,
    setDate,
    setDescription,
    
    submit,
    reset,
  };
}