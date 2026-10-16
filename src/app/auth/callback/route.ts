import { createServerClientSupabase } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createServerClientSupabase()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Create user profile in database if it doesn't exist
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Here you would create/update the User record in Prisma
        // This is typically done via an API route or server action
      }
    }
  }

  // URL to redirect to after sign in process completes
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'
  const dynamicUrl = isLocalEnv
    ? `http://${request.headers.get('host')}`
    : `https://${forwardedHost || 'ms-a-plat.vercel.app'}`

  return NextResponse.redirect(`${dynamicUrl}${next}`)
}
