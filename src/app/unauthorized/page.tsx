import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-semibold mb-4">Access Denied</h1>

        <p className="text-[var(--color-body)] mb-6">
          You don't have permission to access this page. Your account may not have the required role or is pending approval.
        </p>

        <div className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle p-6 mb-6">
          <p className="text-sm text-[var(--color-body)]">
            If you believe this is an error, please contact your administrator.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white border border-[var(--color-hairline)] rounded-lg font-medium hover:bg-[var(--color-canvas-soft)] transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  )
}
