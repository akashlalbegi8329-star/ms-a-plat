import { NextResponse } from 'next/server'
import { createServerClientSupabase } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const supabase = await createServerClientSupabase()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if profile already exists
    const existingUser = await prisma.user.findUnique({
      where: { authId: user.id },
    })

    if (existingUser) {
      return NextResponse.json({ user: existingUser })
    }

    // Create user profile in Prisma
    const newUser = await prisma.user.create({
      data: {
        authId: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        role: 'CONTRIBUTOR', // Default role, requires admin approval
        isActive: false, // Requires admin approval
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
      },
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error('Error creating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
