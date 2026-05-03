import { Transaction } from '@/lib/types'
import { format } from 'date-fns'
import { clsx } from 'clsx'
import { formatCurrency, getCategoryIcon } from '@/lib/utils'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'
  
  return (
    <div className="flex items-center justify-between bg-white p-md rounded-xl border border-neutral-100 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
      <div className="flex items-center gap-md">
        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
          <span className="material-symbols-outlined">{getCategoryIcon(transaction.category)}</span>
        </div>
        <div>
          <p className="text-label-md text-primary">{transaction.note || transaction.category}</p>
          <p className="text-label-sm text-secondary">
            {transaction.category} • {format(new Date(transaction.created_at), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <span className={clsx(
        "text-label-md font-bold",
        isIncome ? "text-green-600" : "text-primary"
      )}>
        {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
      </span>
    </div>
  )
}
