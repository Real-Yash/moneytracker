'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen pb-32">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-100 flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
          <h1 className="text-headline-sm text-neutral-900">Settings</h1>
        </div>
      </header>

      <main className="pt-20 px-md max-w-2xl mx-auto">
        <section className="mb-lg pt-4 flex items-center gap-md">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary text-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-3xl">person</span>
          </div>
          <div>
            <h2 className="text-headline-sm text-primary">{user?.email?.split('@')[0] || 'User'}</h2>
            <p className="text-label-sm text-on-surface-variant">{user?.email || 'Loading...'}</p>
          </div>
        </section>

        <div className="space-y-base mb-xl">
          <h3 className="text-label-sm text-on-surface-variant px-base mb-sm uppercase tracking-widest">Interface</h3>
          <div className="flex items-center justify-between p-md bg-white rounded-2xl border border-neutral-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
              <div>
                <p className="text-label-md text-primary">Dark Mode</p>
                <p className="text-label-sm text-on-surface-variant">Switch themes (Coming soon)</p>
              </div>
            </div>
            <div className="w-11 h-6 bg-surface-container rounded-full relative cursor-not-allowed">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>

        <div className="space-y-base mb-xl">
          <h3 className="text-label-sm text-on-surface-variant px-base mb-sm uppercase tracking-widest">System</h3>
          <div className="flex items-center justify-between p-md bg-white rounded-2xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">sync</span>
              </div>
              <div>
                <p className="text-label-md text-primary">Sync Status</p>
                <p className="text-label-sm text-on-surface-variant">Cloud data synchronization</p>
              </div>
            </div>
            <div className="flex items-center gap-xs px-sm py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>

        <div className="mt-xl text-center px-md">
          <button 
            onClick={handleSignOut}
            className="text-label-md text-error px-lg py-md border border-error/20 rounded-2xl w-full hover:bg-error/5 active:scale-95 transition-all font-bold"
          >
            Sign Out
          </button>
        </div>
      </main>

      <Navigation />
    </div>
  )
}
