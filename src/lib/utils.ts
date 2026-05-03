import { Transaction } from "./types";

export function calculateSummaries(transactions: Transaction[]) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);
  
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);
  
  const balance = income - expenses;

  return { income, expenses, balance };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getCategoryIcon(category: string) {
  const icons: { [key: string]: string } = {
    food: 'restaurant',
    'food & drink': 'restaurant',
    transport: 'directions_car',
    travel: 'directions_car',
    shopping: 'shopping_bag',
    entertainment: 'movie',
    health: 'medical_services',
    income: 'payments',
    salary: 'payments',
    rent: 'home',
    housing: 'home',
    bills: 'receipt',
    savings: 'savings',
    wellness: 'fitness_center',
  };
  return icons[category.toLowerCase()] || 'category';
}
