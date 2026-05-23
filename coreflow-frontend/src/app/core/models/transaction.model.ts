export type TransactionType = 'INCOME' | 'EXPENSE';

export type TransactionCategory =
  | 'ESSENTIAL'
  | 'NON_ESSENTIAL'
  | 'INVESTMENT'
  | 'HEALTH'
  | 'EDUCATION'
  | 'LEISURE'
  | 'TRANSPORT'
  | 'FOOD'
  | 'OTHER';

export interface TransactionRequest {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  householdId: number;
  userId: number;
}

export interface TransactionResponse {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  createdBy: string;
  householdId: number;
}