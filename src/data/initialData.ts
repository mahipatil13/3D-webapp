import { Expense } from '../types';

export const INITIAL_BUDGET = 20000;
export const CURRENT_MONTH = '2026-10'; // October 2026

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'tx-1', date: '2026-10-12', description: 'Zomato', category: 'Food', amount: 420, paymentMethod: 'UPI' },
  { id: 'tx-2', date: '2026-10-11', description: 'Uber', category: 'Transport', amount: 250, paymentMethod: 'Card' },
  { id: 'tx-3', date: '2026-10-10', description: 'Amazon', category: 'Shopping', amount: 1299, paymentMethod: 'Credit Card' },
  { id: 'tx-4', date: '2026-10-08', description: 'Electricity Bill', category: 'Bills', amount: 1750, paymentMethod: 'NetBanking' },
  { id: 'tx-5', date: '2026-10-06', description: 'Netflix', category: 'Other', amount: 199, paymentMethod: 'Subscription' },
  { id: 'tx-6', date: '2026-10-05', description: 'Grocery Supermart', category: 'Food', amount: 1850, paymentMethod: 'UPI' },
  { id: 'tx-7', date: '2026-10-05', description: 'Metro Pass Recharge', category: 'Transport', amount: 800, paymentMethod: 'UPI' },
  { id: 'tx-8', date: '2026-10-04', description: 'Zara Apparel', category: 'Shopping', amount: 1100, paymentMethod: 'Card' },
  { id: 'tx-9', date: '2026-10-04', description: 'Blue Tokai Coffee', category: 'Food', amount: 380, paymentMethod: 'UPI' },
  { id: 'tx-10', date: '2026-10-03', description: 'Fuel Station', category: 'Transport', amount: 950, paymentMethod: 'Card' },
  { id: 'tx-11', date: '2026-10-03', description: 'Swiggy Dinner', category: 'Food', amount: 650, paymentMethod: 'UPI' },
  { id: 'tx-12', date: '2026-10-02', description: 'Book Store Novel', category: 'Shopping', amount: 601, paymentMethod: 'UPI' },
  { id: 'tx-13', date: '2026-10-02', description: 'Auto Rickshaw', category: 'Transport', amount: 120, paymentMethod: 'Cash' },
  { id: 'tx-14', date: '2026-10-02', description: 'Spotify Premium', category: 'Other', amount: 119, paymentMethod: 'Card' },
  { id: 'tx-15', date: '2026-10-01', description: 'Dinner with Team', category: 'Food', amount: 900, paymentMethod: 'Card' },
  { id: 'tx-16', date: '2026-10-01', description: 'Cab to Airport', category: 'Transport', amount: 380, paymentMethod: 'Card' },
  { id: 'tx-17', date: '2026-10-01', description: 'Cloud Storage', category: 'Other', amount: 130, paymentMethod: 'Card' },
  { id: 'tx-18', date: '2026-10-01', description: 'Snacks & Beverages', category: 'Other', amount: 552, paymentMethod: 'UPI' },
  // Historical transactions for past months to feed trend data
  { id: 'tx-h1', date: '2026-09-28', description: 'Groceries', category: 'Food', amount: 3200, paymentMethod: 'Card' },
  { id: 'tx-h2', date: '2026-09-15', description: 'Flight Tickets', category: 'Transport', amount: 5400, paymentMethod: 'Card' },
  { id: 'tx-h3', date: '2026-08-20', description: 'Gadget Store', category: 'Shopping', amount: 6200, paymentMethod: 'Card' },
  { id: 'tx-h4', date: '2026-07-12', description: 'Water & Gas Bill', category: 'Bills', amount: 2100, paymentMethod: 'UPI' },
];

export interface TrendMonthData {
  month: string;
  label: string;
  income: number;
  expense: number;
  totalSpent: number;
}

export const SIX_MONTH_TREND: TrendMonthData[] = [
  { month: '2026-05', label: 'May', income: 18000, expense: 11200, totalSpent: 11200 },
  { month: '2026-06', label: 'Jun', income: 20000, expense: 13400, totalSpent: 13400 },
  { month: '2026-07', label: 'Jul', income: 22000, expense: 14800, totalSpent: 14800 },
  { month: '2026-08', label: 'Aug', income: 22500, expense: 15200, totalSpent: 15200 },
  { month: '2026-09', label: 'Sep', income: 24000, expense: 16100, totalSpent: 16100 },
  { month: '2026-10', label: 'Oct', income: 26000, expense: 12450, totalSpent: 12450 },
];
