'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', href: '/' },
    { label: 'Transactions', icon: 'receipt_long', href: '/transactions' },
    { label: 'Insights', icon: 'insights', href: '/insights' },
    { label: 'Settings', icon: 'settings', href: '/settings' },
  ]

  if (pathname === '/login' || pathname === '/add') return null

  return (
    <>
      {/* FAB for Mobile/Tablet */}
      <Link
        href="/add"
        className="fixed bottom-24 right-md md:bottom-10 md:right-10 w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40 lg:hidden"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </Link>

      {/* Bottom Nav for Mobile/Tablet */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-white/80 backdrop-blur-md border-t border-neutral-100 lg:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center justify-center transition-all active:opacity-70 flex-1 h-full',
                isActive ? 'text-primary' : 'text-neutral-400'
              )}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 400" }}
              >
                {item.icon}
              </span>
              <span className="font-manrope text-[12px] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-100 flex-col p-lg z-50">
        <div className="mb-xl px-md">
          <h1 className="text-headline-sm text-primary tracking-tighter">MoneyTrack</h1>
          <p className="text-label-sm text-on-surface-variant font-medium opacity-60">Personal Finance</p>
        </div>

        <nav className="flex-1 space-y-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-md px-md py-3 rounded-2xl transition-all font-bold',
                  isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'
                )}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="text-label-md">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Link
          href="/add"
          className="mt-auto flex items-center justify-center gap-sm bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Transaction</span>
        </Link>
      </aside>
    </>
  )
}
