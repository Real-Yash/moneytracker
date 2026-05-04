'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addTransaction } from '@/lib/actions'
import { TransactionType } from '@/lib/types'
import { clsx } from 'clsx'

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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save transaction'
      console.error(error)
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { label: 'Food', icon: 'restaurant', type: 'expense' },
    { label: 'Transport', icon: 'directions_car', type: 'expense' },
    { label: 'Housing', icon: 'home', type: 'expense' },
    { label: 'Shopping', icon: 'shopping_bag', type: 'expense' },
    { label: 'Salary', icon: 'payments', type: 'income' },
    { label: 'Entertainment', icon: 'movie', type: 'expense' },
    { label: 'Health', icon: 'medical_services', type: 'expense' },
    { label: 'Bills', icon: 'receipt', type: 'expense' },
  ]

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col items-center">
      <header className="flex flex-row items-center justify-between w-full h-[64px] bg-white border-b border-neutral-100 sticky top-0 z-50 px-[16px]">
        <div className="flex flex-row items-center w-full max-w-[448px] mx-auto justify-between">
          <button onClick={() => router.back()} className="w-[40px] h-[40px] flex items-center justify-center rounded-full active:scale-95 transition-transform hover:bg-neutral-50">
            <span className="material-symbols-outlined text-[#1a1c1c]">close</span>
          </button>
          <h1 className="text-[20px] font-bold text-[#1a1c1c]">Add Transaction</h1>
          <div className="w-[40px]"></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[448px] px-[16px] pb-[40px] flex flex-col items-center">
        {/* Type Toggle */}
        <section className="mt-[24px] mb-[16px] flex flex-col items-center w-full">
          <div className="flex flex-row bg-[#eeeeee] p-[4px] rounded-full w-full max-w-[240px]">
            <button 
              onClick={() => setType('expense')}
              className={clsx(
                "flex-1 py-[10px] rounded-full text-[12px] transition-all font-bold text-center",
                type === 'expense' ? "bg-white text-black shadow-sm" : "text-[#444748]"
              )}
            >
              Expense
            </button>
            <button 
              onClick={() => setType('income')}
              className={clsx(
                "flex-1 py-[10px] rounded-full text-[12px] transition-all font-bold text-center",
                type === 'income' ? "bg-white text-black shadow-sm" : "text-[#444748]"
              )}
            >
              Income
            </button>
          </div>
        </section>
        
        {/* Amount Display */}
        <section className="py-[16px] w-full text-center">
          <span className="text-[14px] text-[#444748] uppercase tracking-[0.1em] font-bold opacity-60">Amount</span>
          <div className="flex flex-row items-baseline justify-center gap-[4px] mt-[4px]">
            <span className="text-[24px] text-[#444748] font-bold">$</span>
            <span className="text-[36px] text-black font-bold">{amount === '0' ? '0.00' : amount}</span>
          </div>
        </section>

        {/* Date Pill */}
        <section className="pb-[16px] flex flex-col items-center">
          <div className="inline-flex flex-row items-center gap-[8px] px-[20px] py-[10px] bg-[#f3f3f3] rounded-full border border-[#c4c7c7]">
            <span className="material-symbols-outlined text-[18px] text-[#444748]">calendar_today</span>
            <span className="text-[12px] text-[#1a1c1c] font-bold" suppressHydrationWarning>
              Today, {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </section>

        {/* Category Icons */}
        <section className="py-[24px] w-full overflow-x-auto no-scrollbar">
          <div className="flex flex-row gap-[24px] px-[4px] min-w-max">
            {categories.map((cat) => (
              <button 
                key={cat.label} 
                onClick={() => {
                  setCategory(cat.label)
                  setType(cat.type as TransactionType)
                }}
                className="flex flex-col items-center gap-[8px] shrink-0 active:scale-95 transition-transform"
              >
                <div className={clsx(
                  "w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all",
                  category === cat.label ? "bg-black text-white shadow-lg scale-110" : "bg-[#e2e2e2] text-black"
                )}>
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span className={clsx("text-[12px]", category === cat.label ? "font-bold text-black" : "text-[#444748]")}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Note Input */}
        <section className="py-[16px] w-full">
          <div className="relative w-full">
            <input 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#eeeeee] border-none rounded-[16px] px-[24px] py-[20px] text-[16px] focus:ring-2 focus:ring-black/10 transition-all placeholder:text-[#444748]/40 shadow-inner" 
              placeholder="Add a note (optional)" 
              type="text"
            />
            <span className="absolute right-[24px] top-1/2 -translate-y-1/2 material-symbols-outlined text-[#444748]/30">edit</span>
          </div>
        </section>

        {/* Keypad */}
        <section className="py-[24px] w-full">
          <div className="grid grid-cols-3 gap-[16px] w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
              <button 
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-[64px] flex items-center justify-center rounded-[20px] bg-white border border-neutral-100 shadow-sm hover:bg-[#e8e8e8] active:scale-95 transition-all text-[20px] font-bold text-black"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={handleBackspace}
              className="h-[64px] flex items-center justify-center rounded-[20px] bg-[#e2e2e2] active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-black">backspace</span>
            </button>
          </div>
        </section>

        {/* Save Button */}
        <section className="py-[24px] w-full">
          <button 
            onClick={handleSave}
            disabled={loading || parseFloat(amount) === 0}
            className="w-full h-[64px] bg-black text-white rounded-[20px] text-[20px] font-bold flex items-center justify-center shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : 'Save Transaction'}
          </button>
        </section>

        {/* Quick Insights */}
        <section className="mt-[40px] mb-[16px] w-full space-y-[16px]">
          <h2 className="text-[14px] text-[#444748] uppercase tracking-[0.1em] font-bold opacity-60 px-[8px]">Quick Insights</h2>
          <div className="w-full p-[24px] bg-[#f3f3f3] rounded-[24px] flex flex-row items-center justify-between border border-[#eeeeee] shadow-sm">
            <div className="flex flex-col">
              <p className="text-[12px] text-[#444748] font-medium">Daily Average</p>
              <p className="text-[20px] text-black font-bold">$42.00</p>
            </div>
            <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-white shadow-md">
              <span className="material-symbols-outlined text-black text-[28px]">trending_up</span>
            </div>
          </div>
        </section>

        {/* Master Flow Image Card */}
        <section className="mt-[24px] w-full">
          <div className="w-full h-[224px] rounded-[24px] overflow-hidden relative border border-[#eeeeee] shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="w-full h-full object-cover grayscale opacity-90" 
              alt="Financial mindfulness"
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-[24px] left-[24px]">
              <p className="text-[14px] text-white font-bold uppercase tracking-[0.2em]">Master your flow</p>
              <p className="text-[12px] text-white/90 font-bold mt-[4px]">You&apos;ve logged 12 days in a row</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
