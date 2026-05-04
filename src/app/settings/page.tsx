'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen pb-32 lg:pb-0 lg:pl-64">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-100 flex justify-between items-center px-4 h-16 lg:pl-[272px] lg:px-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container lg:hidden">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <h1 className="text-label-md font-bold text-neutral-900 uppercase tracking-widest">Settings</h1>
        </div>
      </header>

      <main className="pt-20 px-md max-w-4xl mx-auto lg:px-xl lg:py-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <section className="md:col-span-2 mb-lg flex items-center gap-md bg-white p-lg rounded-[2.5rem] border border-neutral-100 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary text-2xl border-4 border-white shadow-lg">
              <span className="material-symbols-outlined text-4xl">person</span>
            </div>
            <div>
              <h2 className="text-headline-sm text-primary font-bold">{user?.email?.split('@')[0] || 'Zenith User'}</h2>
              <p className="text-label-sm text-on-surface-variant font-medium opacity-60">{user?.email || 'Synchronizing...'}</p>
            </div>
          </section>

          <div className="space-y-xl">
            <section className="space-y-base">
              <h3 className="text-label-sm text-on-surface-variant px-base mb-sm uppercase tracking-[0.2em] font-bold opacity-60">Interface</h3>
              <div className="flex items-center justify-between p-lg bg-white rounded-[2rem] border border-neutral-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">dark_mode</span>
                  </div>
                  <div>
                    <p className="text-label-md text-primary font-bold">Dark Mode</p>
                    <p className="text-label-sm text-on-surface-variant font-medium">Coming in next update</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-surface-container rounded-full relative opacity-50">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-xl">
            <section className="space-y-base">
              <h3 className="text-label-sm text-on-surface-variant px-base mb-sm uppercase tracking-[0.2em] font-bold opacity-60">System</h3>
              <div className="flex items-center justify-between p-lg bg-white rounded-[2rem] border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">sync</span>
                  </div>
                  <div>
                    <p className="text-label-md text-primary font-bold">Sync Status</p>
                    <p className="text-label-sm text-on-surface-variant font-medium">Real-time cloud backup</p>
                  </div>
                </div>
                <div className="flex items-center gap-xs px-sm py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>
            </section>
          </div>

          <section className="md:col-span-2 mt-xl text-center px-md max-w-md mx-auto w-full">
            <button 
              onClick={handleSignOut}
              className="text-label-md text-error px-lg py-5 border border-error/20 rounded-2xl w-full hover:bg-error/5 active:scale-95 transition-all font-bold uppercase tracking-widest shadow-sm"
            >
              Terminate Session
            </button>
            <p className="mt-8 text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-30">
              MoneyTrack v1.2.4 (Stable)
            </p>
          </section>
        </div>
      </main>

      <Navigation />
    </div>
  )
}
