import { SignInForm } from '@/components/auth/SignInForm'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--color-ink)]">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            MSME AI
          </Link>
          <h1 className="text-3xl font-semibold mt-6 mb-2">Welcome back</h1>
          <p className="text-[var(--color-body)]">Sign in to your account</p>
        </div>

        <SignInForm />

        <div className="text-center mt-6">
          <p className="text-sm text-[var(--color-body)]">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[var(--color-link)] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
