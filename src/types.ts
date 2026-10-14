export type CategoryType = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Other' | 'Entertainment';

export interface Expense {
  id: string;
  date: string; // ISO date 'YYYY-MM-DD'
  description: string;
  category: CategoryType;
  amount: number;
  paymentMethod?: string;
  notes?: string;
}

export interface MonthlyBudget {
  month: string; // 'YYYY-MM'
  budgetAmount: number;
}

export interface CategoryMeta {
  name: CategoryType;
  color: string;
  glowColor: string;
  iconName: string;
  shape: 'sphere' | 'box' | 'torus' | 'octahedron';
}

export const CATEGORY_CONFIG: Record<CategoryType, CategoryMeta> = {
  Food: {
    name: 'Food',
    color: '#ff7b25',
    glowColor: 'rgba(255, 123, 37, 0.4)',
    iconName: 'Utensils',
    shape: 'sphere',
  },
  Transport: {
    name: 'Transport',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    iconName: 'Car',
    shape: 'box',
  },
  Shopping: {
    name: 'Shopping',
    color: '#00f5a0',
    glowColor: 'rgba(0, 245, 160, 0.4)',
    iconName: 'ShoppingBag',
    shape: 'sphere',
  },
  Bills: {
    name: 'Bills',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    iconName: 'Zap',
    shape: 'torus',
  },
  Other: {
    name: 'Other',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    iconName: 'MoreHorizontal',
    shape: 'sphere',
  },
  Entertainment: {
    name: 'Entertainment',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    iconName: 'Film',
    shape: 'octahedron',
  },
};
