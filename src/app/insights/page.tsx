import { getTransactions } from '@/lib/actions'
import InsightsClient from '@/components/InsightsClient'

export default async function InsightsPage() {
  const transactions = await getTransactions()
  return <InsightsClient transactions={transactions} />
}
