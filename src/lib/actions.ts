'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NewTransaction } from '@/lib/types'

async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Authentication required')
  return { supabase, user }
}

export async function addTransaction(transaction: NewTransaction) {
  try {
    const { supabase, user } = await getAuthenticatedUser()

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...transaction, user_id: user.id }])
      .select()

    if (error) throw new Error(error.message)
    
    revalidatePath('/')
    revalidatePath('/transactions')
    revalidatePath('/insights')
    return data[0]
  } catch (error) {
    console.error('addTransaction error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to add transaction'
    throw new Error(errorMessage)
  }
}

export async function updateTransaction(id: string, updates: Partial<NewTransaction>) {
  try {
    const { supabase, user } = await getAuthenticatedUser()

    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()

    if (error) throw new Error(error.message)
    
    revalidatePath('/')
    revalidatePath('/transactions')
    revalidatePath('/insights')
    return data[0]
  } catch (error) {
    console.error('updateTransaction error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update transaction'
    throw new Error(errorMessage)
  }
}

export async function deleteTransaction(id: string) {
  try {
    const { supabase, user } = await getAuthenticatedUser()

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
    
    revalidatePath('/')
    revalidatePath('/transactions')
    revalidatePath('/insights')
  } catch (error) {
    console.error('deleteTransaction error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete transaction'
    throw new Error(errorMessage)
  }
}

export async function getTransactions() {
  try {
    const { supabase } = await getAuthenticatedUser()

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || []
  } catch (error) {
    console.error('getTransactions error:', error)
    return [] // Return empty array on error for safer UI rendering
  }
}
