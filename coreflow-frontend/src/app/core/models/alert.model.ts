export type AlertLevel = 'OK' | 'WARNING' | 'DANGER' | 'CRITICAL';

export interface AlertDTO {
  householdId: number;
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
  usagePercent: number;
  level: AlertLevel;
  message: string;
}

export interface FinancialSummary {
  householdId: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseByCategory: Record<string, number>;
  incomeByCategory: Record<string, number>;
  alert: AlertDTO;
}