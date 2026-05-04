import { getTransactions } from '@/lib/actions'
import { Navigation } from '@/components/Navigation'
import { TransactionItem } from '@/components/TransactionItem'
import { Transaction } from '@/lib/types'
import { calculateSummaries, formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const transactions: Transaction[] = await getTransactions()
  const { income, expenses, balance } = calculateSummaries(transactions)
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="min-h-screen bg-background pb-[128px] lg:pb-0 lg:pl-[256px]">
      <header className="px-lg pt-xl pb-lg flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-30 lg:px-xl">
        <div>
          <h1 className="text-headline-lg text-primary tracking-tighter font-bold">MoneyTrack</h1>
          <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold opacity-60">
            {format(new Date(), 'EEEE, MMMM do')}
          </p>
        </div>
        <div className="w-[48px] h-[48px] rounded-2xl bg-primary shadow-lg flex items-center justify-center text-white transition-transform active:scale-95">
          <span className="material-symbols-outlined">person</span>
        </div>
      </header>

      <main className="px-lg space-y-xl mt-[16px] max-w-7xl mx-auto lg:px-xl lg:py-lg">
        {/* Balance Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          <section className="bg-primary text-white p-xl rounded-[48px] shadow-2xl relative overflow-hidden group lg:col-span-2">
            <div className="absolute top-0 right-0 w-[256px] h-[256px] bg-white/5 rounded-full -mr-[128px] -mt-[128px] transition-transform group-hover:scale-110 duration-700"></div>
            <div className="relative z-10">
              <p className="text-label-sm uppercase tracking-[0.3em] font-bold opacity-50 mb-[16px]">Current Liquidity</p>
              <h2 className="text-[44px] md:text-[56px] font-bold leading-none tracking-tighter mb-xl">
                {formatCurrency(balance)}
              </h2>
              
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="bg-white/10 backdrop-blur-md p-lg rounded-[32px] border border-white/10">
                  <div className="flex items-center gap-[8px] mb-[8px] opacity-60">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Inflow</span>
                  </div>
                  <p className="text-headline-sm md:text-headline-md font-bold">{formatCurrency(income)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-lg rounded-[32px] border border-white/10">
                  <div className="flex items-center gap-[8px] mb-[8px] opacity-60">
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Outflow</span>
                  </div>
                  <p className="text-headline-sm md:text-headline-md font-bold">{formatCurrency(expenses)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Categories / Quick Access - Desktop sidebar-like placement */}
          <section className="lg:col-span-1">
            <h3 className="text-label-sm uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-[24px] px-sm opacity-60">
              Mindful Categories
            </h3>
            <div className="flex gap-[16px] overflow-x-auto pb-[16px] no-scrollbar -mx-lg px-lg lg:grid lg:grid-cols-2 lg:mx-0 lg:px-0 lg:overflow-visible">
              {['Analysis', 'Savings', 'Budget', 'Bills', 'Goals'].map((item) => (
                <button key={item} className="flex-shrink-0 px-[32px] py-[16px] bg-white rounded-[24px] border border-neutral-100 text-label-md font-bold hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 lg:flex-none">
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Transactions */}
        <section className="max-w-4xl">
          <div className="flex justify-between items-end mb-[32px] px-sm">
            <div>
              <h3 className="text-headline-sm font-bold text-primary tracking-tight">Recent activity</h3>
              <p className="text-label-sm text-on-surface-variant font-medium">Your latest financial logs</p>
            </div>
            <a href="/transactions" className="text-label-sm font-bold text-primary uppercase tracking-widest hover:underline">
              View all
            </a>
          </div>
          
          <div className="space-y-[16px]">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-[80px] bg-white rounded-[48px] border border-dashed border-neutral-200">
                <div className="w-[64px] h-[64px] bg-surface-container rounded-full flex items-center justify-center mx-auto mb-[16px] text-on-surface-variant opacity-40">
                  <span className="material-symbols-outlined text-3xl">receipt_long</span>
                </div>
                <p className="text-on-surface-variant text-label-md font-bold uppercase tracking-widest opacity-40">No entries detected</p>
              </div>
            ) : (
              recentTransactions.map((t) => (
                <TransactionItem key={t.id} transaction={t} />
              ))
            )}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  )
}
