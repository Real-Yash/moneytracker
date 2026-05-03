import { getTransactions } from '@/lib/actions'
import TransactionsClient from '@/components/TransactionsClient'

export default async function TransactionsPage() {
  const transactions = await getTransactions()
  return <TransactionsClient initialTransactions={transactions} />
}
