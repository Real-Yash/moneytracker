'use client'

import { useState } from 'react'
import { Transaction } from '@/lib/types'
import { format, isToday, isYesterday } from 'date-fns'
import { Navigation } from '@/components/Navigation'
import { TransactionItem } from '@/components/TransactionItem'
import { clsx } from 'clsx'

interface TransactionsPageProps {
  initialTransactions: Transaction[]
}

export default function TransactionsClient({ initialTransactions }: TransactionsPageProps) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')

  const filteredTransactions = initialTransactions.filter((t) => {
    const matchesSearch = (t.note || '').toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'all' || t.type === filterType
    return matchesSearch && matchesType
  })

  // Group by date
  const groups: { [key: string]: Transaction[] } = {}
  filteredTransactions.forEach((t) => {
    const date = new Date(t.created_at)
    let label = format(date, 'MMMM d, yyyy')
    if (isToday(date)) label = 'Today'
    else if (isYesterday(date)) label = 'Yesterday'
    
    if (!groups[label]) groups[label] = []
    groups[label].push(t)
  })

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-white border-b border-neutral-100 sticky top-0 z-50 flex justify-between items-center w-full px-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <h1 className="text-label-md font-bold text-neutral-900">Transactions</h1>
        </div>
      </header>

      <main className="px-md mt-4">
        <section className="py-md space-y-md">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container border-none rounded-xl pl-10 pr-4 py-3 text-body-md focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-tertiary-container" 
              placeholder="Search activities..." 
              type="text"
            />
          </div>
          <div className="flex gap-sm overflow-x-auto no-scrollbar pb-xs">
            {['all', 'income', 'expense'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type as any)}
                className={clsx(
                  "flex items-center gap-base px-md py-2 rounded-full text-label-md transition-all active:scale-95 whitespace-nowrap",
                  filterType === type ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface"
                )}
              >
                <span className="capitalize">{type === 'all' ? 'All Activities' : type}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-lg mt-4">
          {Object.keys(groups).length === 0 ? (
            <div className="text-center py-xl bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
              <p className="text-on-surface-variant text-body-md">No transactions found.</p>
            </div>
          ) : (
            Object.entries(groups).map(([label, items]) => (
              <section key={label}>
                <h3 className="text-label-sm uppercase tracking-widest text-on-surface-variant mb-md px-sm">{label}</h3>
                <div className="space-y-sm">
                  {items.map((t) => (
                    <TransactionItem key={t.id} transaction={t} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      <Navigation />
    </div>
  )
}
