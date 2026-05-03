'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addTransaction } from '@/lib/actions'
import { TransactionType } from '@/lib/types'
import { clsx } from 'clsx'
import { getCategoryIcon } from '@/lib/utils'

export default function QuickAddPage() {
  const [amount, setAmount] = useState('0')
  const [category, setCategory] = useState('Food')
  const [note, setNote] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleNumberClick = (num: string) => {
    if (num === '.') {
      if (!amount.includes('.')) {
        setAmount(amount + '.')
      }
      return
    }
    
    if (amount === '0') {
      setAmount(num)
    } else {
      // Limit to 2 decimal places
      if (amount.includes('.') && amount.split('.')[1].length >= 2) return
      setAmount(amount + num)
    }
  }

  const handleBackspace = () => {
    if (amount.length <= 1) {
      setAmount('0')
    } else {
      setAmount(amount.slice(0, -1))
    }
  }

  const handleSave = async () => {
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      await addTransaction({
        amount: numericAmount,
        category,
        note,
        type,
      })
      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Failed to save transaction')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { label: 'Food', icon: 'restaurant' },
    { label: 'Transport', icon: 'directions_car' },
    { label: 'Housing', icon: 'home' },
    { label: 'Shopping', icon: 'shopping_bag' },
    { label: 'Salary', icon: 'payments', type: 'income' },
    { label: 'Entertainment', icon: 'movie' },
    { label: 'Health', icon: 'medical_services' },
    { label: 'Bills', icon: 'receipt' },
  ]

  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="flex justify-between items-center w-full px-4 h-16 bg-white border-b border-neutral-100 sticky top-0 z-50">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform hover:bg-neutral-50">
          <span className="material-symbols-outlined text-on-surface">close</span>
        </button>
        <h1 className="text-headline-sm text-on-surface">Add Transaction</h1>
        <div className="w-10"></div>
      </header>

      <main className="max-w-md mx-auto pb-lg px-md">
        <section className="pt-lg pb-md flex flex-col items-center justify-center space-y-4">
          <div className="flex bg-surface-container p-1 rounded-full w-full max-w-[200px]">
            <button 
              onClick={() => setType('expense')}
              className={clsx(
                "flex-1 py-1 rounded-full text-label-sm transition-all",
                type === 'expense' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
              )}
            >
              Expense
            </button>
            <button 
              onClick={() => setType('income')}
              className={clsx(
                "flex-1 py-1 rounded-full text-label-sm transition-all",
                type === 'income' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
              )}
            >
              Income
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-label-md text-on-surface-variant uppercase tracking-widest block mb-1">Amount</span>
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-headline-md text-on-surface-variant">$</span>
              <span className="text-numeric-display text-primary">{amount}</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-surface-container-low rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
            <span className="text-label-sm text-on-surface">Today, {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
        </section>

        <section className="py-md overflow-x-auto no-scrollbar -mx-md">
          <div className="flex space-x-6 px-md">
            {categories.map((cat) => (
              <button 
                key={cat.label} 
                onClick={() => {
                  setCategory(cat.label)
                  if (cat.type) setType(cat.type as TransactionType)
                }}
                className="flex flex-col items-center space-y-2 shrink-0 group active:scale-95 transition-transform"
              >
                <div className={clsx(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                  category === cat.label ? "bg-primary text-on-primary shadow-lg" : "bg-surface-container-highest text-primary"
                )}>
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className={clsx("text-label-sm", category === cat.label ? "font-bold text-primary" : "text-on-surface-variant")}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="pb-md">
          <div className="relative">
            <input 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-surface-container border-none rounded-xl px-md py-4 text-body-md focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/40" 
              placeholder="Add a note (optional)" 
              type="text"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/30">edit</span>
          </div>
        </section>

        <section className="pt-sm">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
              <button 
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 flex items-center justify-center rounded-2xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all text-headline-sm font-numeric-display"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={handleBackspace}
              className="h-16 flex items-center justify-center rounded-2xl bg-surface-container-highest active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-primary">backspace</span>
            </button>
          </div>
        </section>

        <section className="pt-xl">
          <button 
            onClick={handleSave}
            disabled={loading || parseFloat(amount) === 0}
            className="w-full h-16 bg-primary text-on-primary rounded-2xl text-headline-sm flex items-center justify-center shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : 'Save Transaction'}
          </button>
        </section>
      </main>
    </div>
  )
}
