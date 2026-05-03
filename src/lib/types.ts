export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: TransactionType
  category: string
  note: string | null
  created_at: string
}

export type NewTransaction = Omit<Transaction, 'id' | 'created_at' | 'user_id'>
