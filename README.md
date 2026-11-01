# Expense Tracker

A React Native (Expo + TypeScript) expense tracker built with MVVM architecture. Transaction data is stored on-device with AsyncStorage.

## Features
- Add income and expense transactions (amount, category, date, description)
- Total income, total expenses and current balance (balance turns red when negative)
- Transaction history, newest first
- Filter transactions by category
- Donut chart of expenses by category
- Data persists across app restarts (AsyncStorage)
- Long-press a transaction to delete it

## Tech stack
Expo, React Native, TypeScript, `@react-native-async-storage/async-storage`, `react-native-svg`, `@react-native-community/datetimepicker`, `react-native-safe-area-context`.

## Setup
Prerequisites: Node.js 18+ and the **Expo Go** app on your phone.

```bash
git clone https://github.com/vedvyas-14/expense-tracker.git
cd expense-tracker
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). The phone and computer must be on the same Wi-Fi. If the QR code doesn't connect, run `npx expo start --tunnel`.

## Architecture (MVVM)
- **Model** (`src/model`): types, categories and pure calculation functions (totals, expenses by category, filtering, sorting)
- **Data** (`src/data`): the repository, the only code that touches AsyncStorage
- **ViewModel** (`src/viewmodels`): hooks that hold state and logic (`useHomeViewModel`, `useAddTransactionViewModel`)
- **View** (`src/views`): screens and components that render and call ViewModel functions; each component's styles live in a matching `.styles.ts` file

## Project structure
```
App.tsx
src/
  model/        types, categories, transactionCalculations
  data/         transactionRepository
  viewmodels/   useHomeViewModel, useAddTransactionViewModel
  views/        screens/, components/ (with .styles.ts files)
  theme/        colours, spacing, radii
  utils/        formatting helpers
```