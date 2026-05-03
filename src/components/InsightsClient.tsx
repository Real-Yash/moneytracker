'use client'

import { Transaction } from '@/lib/types'
import { Navigation } from '@/components/Navigation'
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, AreaChart, Area } from 'recharts'
import { format, startOfMonth, eachDayOfInterval, endOfMonth, isSameDay } from 'date-fns'
import { formatCurrency, getCategoryIcon } from '@/lib/utils'

interface InsightsPageProps {
  transactions: Transaction[]
}

export default function InsightsClient({ transactions }: InsightsPageProps) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const now = new Date()
  const currentMonthExpenses = expenses.filter(t => {
    const d = new Date(t.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  
  const totalSpending = currentMonthExpenses.reduce((acc, t) => acc + Number(t.amount), 0)

  // Calculate daily spending for the current month
  const start = startOfMonth(now)
  const end = endOfMonth(now)
  const days = eachDayOfInterval({ start, end })

  const chartData = days.map((day) => {
    const amount = expenses
      .filter((t) => isSameDay(new Date(t.created_at), day))
      .reduce((acc, t) => acc + Number(t.amount), 0)
    return {
      day: format(day, 'd'),
      amount,
    }
  })

  // Top categories
  const categoriesMap: { [key: string]: { amount: number; count: number } } = {}
  expenses.forEach((t) => {
    if (!categoriesMap[t.category]) {
      categoriesMap[t.category] = { amount: 0, count: 0 }
    }
    categoriesMap[t.category].amount += Number(t.amount)
    categoriesMap[t.category].count += 1
  })

  const topCategories = Object.entries(categoriesMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  const maxCategoryAmount = Math.max(...topCategories.map((c) => c.amount), 1)

  return (
    <div className="min-h-screen bg-surface-bright pb-32">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <h1 className="text-label-md font-bold text-neutral-900 uppercase tracking-widest">Insights</h1>
        </div>
      </header>

      <main className="flex-1 mt-16 px-md pt-lg max-w-2xl mx-auto w-full">
        <section className="mb-xl">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Monthly Outflow</p>
          <div className="flex items-baseline gap-2">
            <span className="text-numeric-display text-primary">{formatCurrency(totalSpending)}</span>
            <span className="text-label-sm text-on-surface-variant font-medium">in {format(now, 'MMMM')}</span>
          </div>
        </section>

        <section className="mb-xl">
          <div className="bg-white p-lg rounded-[2.5rem] border border-neutral-100/50 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-lg relative z-10">
              <h2 className="text-label-md font-bold uppercase tracking-wider">Spending Trend</h2>
            </div>
            <div className="h-56 w-full -ml-4 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.05}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => `Day ${label}`}
                    cursor={{ stroke: '#000000', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#000000" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorAmount)"
                    activeDot={{ r: 6, fill: '#000000', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 px-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40">
              <span>{format(start, 'MMM d')}</span>
              <span>{format(end, 'MMM d')}</span>
            </div>
          </div>
        </section>

        <section className="mb-xl">
          <div className="flex justify-between items-center mb-md px-sm">
            <h2 className="text-label-md font-bold uppercase tracking-wider">Category Breakdown</h2>
          </div>
          <div className="space-y-sm">
            {topCategories.length === 0 ? (
               <div className="text-center py-xl bg-white rounded-[2.5rem] border border-dashed border-outline-variant">
                <p className="text-on-surface-variant text-label-md font-medium">No activity to visualize yet.</p>
              </div>
            ) : topCategories.map((cat) => (
              <div key={cat.name} className="bg-white p-md rounded-[1.5rem] border border-neutral-100/50 shadow-sm transition-transform active:scale-[0.98]">
                <div className="flex justify-between items-center mb-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined text-[20px]">{getCategoryIcon(cat.name)}</span>
                    </div>
                    <div>
                      <h3 className="text-label-md font-bold">{cat.name}</h3>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{cat.count} Logs</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-label-md font-bold block">{formatCurrency(cat.amount)}</span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                      {Math.round((cat.amount / totalSpending) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(cat.amount / maxCategoryAmount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary-container p-xl rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-110"></div>
          <div className="flex items-start gap-5 relative z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md shadow-lg">
              <span className="material-symbols-outlined text-white text-[24px]">lightbulb</span>
            </div>
            <div>
              <h4 className="text-label-md mb-2 font-bold uppercase tracking-widest text-white/70">Cognitive Insight</h4>
              <p className="text-body-md opacity-90 leading-relaxed font-medium">
                {topCategories.length > 0 
                  ? `Your interaction with ${topCategories[0].name} represents ${Math.round((topCategories[0].amount / totalSpending) * 100)}% of your month. Is this investment of capital reflecting your personal values?`
                  : "Every entry is a step toward financial mindfulness. Start logging to reveal your spending patterns."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  )
}
