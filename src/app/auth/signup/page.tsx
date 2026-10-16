import { SignUpForm } from '@/components/auth/SignUpForm'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--color-ink)]">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            MSME AI
          </Link>
          <h1 className="text-3xl font-semibold mt-6 mb-2">Create your account</h1>
          <p className="text-[var(--color-body)]">Join the MSME growth revolution</p>
        </div>

        <SignUpForm />

        <div className="text-center mt-6">
          <p className="text-sm text-[var(--color-body)]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[var(--color-link)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
