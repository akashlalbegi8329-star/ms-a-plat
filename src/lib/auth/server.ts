import { createServerClientSupabase } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  const supabase = await createServerClientSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/signin')
  }

  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  const supabase = await createServerClientSupabase()

  // Get user profile from Prisma
  const { data: profile } = await supabase
    .from('User')
    .select('role, isActive')
    .eq('authId', user.id)
    .single()

  if (!profile || !profile.isActive) {
    redirect('/auth/pending')
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect('/unauthorized')
  }

  return { user, profile }
}
