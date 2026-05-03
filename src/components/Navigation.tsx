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
      <Link
        href="/add"
        className="fixed bottom-24 right-md w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </Link>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-white/80 backdrop-blur-md border-t border-neutral-100">
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
    </>
  )
}
