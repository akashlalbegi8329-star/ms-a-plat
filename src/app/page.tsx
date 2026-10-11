import Link from "next/link";
import { ArrowRight, Factory, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Mesh Gradient */}
      <div className="relative overflow-hidden bg-[var(--color-canvas-soft)]">
        <div className="absolute inset-0 mesh-gradient opacity-10" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-xl font-semibold">MSME AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/field" className="text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]">
              Field Tool
            </Link>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-full hover:bg-[#000]">
              Get Started
            </Link>
          </div>
        </nav>

        <main className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-canvas)] border border-[var(--color-hairline)] mb-6">
              <span className="font-mono text-xs">NEW</span>
              <span className="text-sm">AI-Powered Manufacturing Assessment</span>
            </div>

            <h1 className="text-display-xl text-[var(--color-ink)] mb-6 leading-[48px]">
              Help MSMEs grow with AI automation and government schemes.
            </h1>

            <p className="text-[18px] leading-7 text-[var(--color-body)] mb-8 max-w-2xl">
              Visit factories, assess automation opportunities with AI, and connect small businesses
              with government schemes and compliance tools. Built for field consultants and MSME owners.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/field/new-assessment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[#000] transition-colors"
              >
                Start Field Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-[var(--color-hairline)] rounded-full font-medium hover:bg-[var(--color-canvas-soft-2)] transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Features Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Factory,
              title: "Field Assessment",
              description: "Mobile-first tool for documenting processes on-site with AI analysis"
            },
            {
              icon: Zap,
              title: "AI Automation",
              description: "Get personalized automation recommendations for manufacturing workflows"
            },
            {
              icon: Shield,
              title: "Compliance Hub",
              description: "Track GST, labor laws, and government documentation requirements"
            },
            {
              icon: TrendingUp,
              title: "Scheme Access",
              description: "Find eligible government schemes like PMEGP, Mudra, and credit guarantee"
            }
          ].map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg p-6 shadow-subtle border border-[var(--color-hairline)]">
              <feature.icon className="h-6 w-6 text-[var(--color-link)] mb-4" />
              <h3 className="text-[20px] font-semibold mb-2">{feature.title}</h3>
              <p className="text-[14px] leading-5 text-[var(--color-body)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-primary)] text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
          <h2 className="text-display-lg mb-4">Ready to transform MSMEs with AI?</h2>
          <p className="text-lg mb-8 text-zinc-300 max-w-2xl mx-auto">
            Join the movement to digitize India's small businesses. Start assessing factories in your area today.
          </p>
          <Link
            href="/field/new-assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-100 transition-colors"
          >
            Start Your First Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-[var(--color-canvas)] border-t border-[var(--color-hairline)]">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Factory className="h-5 w-5" />
                <span className="font-semibold">MSME AI Platform</span>
              </div>
              <p className="text-sm text-[var(--color-body)]">
                Empowering MSMEs through AI automation and government support.
              </p>
            </div>
            <div className="text-sm text-[var(--color-body)]">
              © 2026 MSME AI Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
