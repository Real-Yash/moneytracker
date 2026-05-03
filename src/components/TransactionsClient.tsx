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
    <div className="min-h-screen bg-background pb-32 lg:pb-0 lg:pl-64">
      <header className="bg-white border-b border-neutral-100 sticky top-0 z-50 flex justify-between items-center w-full px-4 h-16 lg:px-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container lg:hidden">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <h1 className="text-label-md font-bold text-neutral-900 uppercase tracking-widest">Transaction History</h1>
        </div>
        <div className="hidden lg:flex items-center gap-md text-on-surface-variant font-bold text-[10px] uppercase tracking-[0.2em]">
          <span>{filteredTransactions.length} Activities Found</span>
        </div>
      </header>

      <main className="px-md mt-4 max-w-5xl mx-auto lg:px-xl lg:py-lg">
        <section className="py-md space-y-md lg:bg-white lg:p-lg lg:rounded-[2rem] lg:border lg:border-neutral-100 lg:shadow-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 bg-surface-container border-none rounded-2xl pl-12 pr-4 py-3 text-body-md focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-tertiary-container" 
              placeholder="Search by note or category..." 
              type="text"
            />
          </div>
          <div className="flex gap-sm overflow-x-auto no-scrollbar pb-xs lg:overflow-visible">
            {['all', 'income', 'expense'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type as any)}
                className={clsx(
                  "flex items-center gap-base px-md py-2.5 rounded-full text-label-md transition-all active:scale-95 whitespace-nowrap lg:px-8",
                  filterType === type ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                )}
              >
                <span className="capitalize">{type === 'all' ? 'All Activities' : type}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-lg mt-8">
          {Object.keys(groups).length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant opacity-40 shadow-sm">
                <span className="material-symbols-outlined text-3xl">search_off</span>
              </div>
              <p className="text-on-surface-variant text-label-md font-bold uppercase tracking-widest opacity-60">No transactions found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-lg">
              {Object.entries(groups).map(([label, items]) => (
                <section key={label} className="lg:mb-lg">
                  <h3 className="text-label-sm uppercase tracking-widest text-on-surface-variant mb-md px-sm font-bold opacity-60">{label}</h3>
                  <div className="space-y-sm">
                    {items.map((t) => (
                      <TransactionItem key={t.id} transaction={t} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  )
}
