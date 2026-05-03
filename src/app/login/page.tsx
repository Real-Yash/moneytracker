'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      }
      router.refresh()
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-gutter">
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-xl shadow-xl border border-neutral-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-lg shadow-lg">
            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
          </div>
          
          <h1 className="text-headline-md text-on-surface mb-xs">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-body-md text-on-surface-variant mb-xl leading-relaxed">
            {mode === 'login' ? 'Sign in to your mindful finance journey.' : 'Start managing your finances with clarity today.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-md">
            <div>
              <label className="block text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 px-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[56px] px-lg rounded-2xl bg-surface-container border-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/30 text-body-md"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 px-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[56px] px-lg rounded-2xl bg-surface-container border-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/30 text-body-md"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-error/5 border border-error/10 p-md rounded-xl flex items-center gap-sm text-error">
                <span className="material-symbols-outlined text-sm">error</span>
                <p className="text-label-sm font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] bg-primary text-on-primary rounded-2xl text-label-md font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : mode === 'login' ? 'Sign In' : 'Get Started'}
            </button>
          </form>

          <div className="mt-xl text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-label-md text-primary font-bold hover:underline"
            >
              {mode === 'login' ? "New here? Create an account" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-xl text-label-sm text-on-surface-variant opacity-50 font-medium">
        MoneyTrack • Minimalist Finance
      </p>
    </div>
  )
}
