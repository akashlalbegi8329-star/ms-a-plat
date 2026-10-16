import Link from 'next/link'
import { Clock, Mail } from 'lucide-react'

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-amber-600" />
        </div>

        <h1 className="text-3xl font-semibold mb-4">Account Pending Approval</h1>

        <p className="text-[var(--color-body)] mb-6">
          Thank you for signing up! Your account is currently under review by our admin team.
        </p>

        <div className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle p-6 mb-6 text-left">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Mail className="h-5 w-5 text-[var(--color-primary)]" />
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-[var(--color-body)]">
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">1.</span>
              Our admin team will review your application
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">2.</span>
              You'll receive an email once approved
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">3.</span>
              Sign in to start using MSME AI Platform
            </li>
          </ul>
        </div>

        <p className="text-sm text-[var(--color-mute)] mb-6">
          This usually takes 1-2 business days
        </p>

        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary)]/90 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
