'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogOut, User as UserIcon, Settings } from 'lucide-react'
import Link from 'next/link'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/signin'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-2 hover:bg-[var(--color-canvas-soft)] rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium">Akash</div>
          <div className="text-xs text-[var(--color-body)]">Consultant</div>
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-[var(--color-hairline)] shadow-lg z-20 py-2">
            <div className="px-4 py-3 border-b border-[var(--color-hairline)]">
              <div className="font-medium text-sm">Akash Lalbegi</div>
              <div className="text-xs text-[var(--color-body)]">akash@example.com</div>
            </div>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--color-canvas-soft)]"
              onClick={() => setOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--color-canvas-soft)]"
              onClick={() => setOpen(false)}
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>

            <hr className="my-2 border-[var(--color-hairline)]" />

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--color-canvas-soft)] w-full text-left text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
