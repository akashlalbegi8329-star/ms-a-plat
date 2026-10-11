import Link from "next/link";
import { Camera, Mic, FileText, Zap, ArrowRight } from "lucide-react";

export default function FieldPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <nav className="bg-white border-b border-[var(--color-hairline)] px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">MSME AI</Link>
          <Link href="/dashboard" className="text-sm text-[var(--color-body)]">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-display-lg mb-2">Field Assessment Tool</h1>
          <p className="text-[var(--color-body)]">Document manufacturing processes and get AI-powered automation recommendations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* New Assessment Card */}
          <Link href="/field/new-assessment" className="group">
            <div className="bg-white rounded-lg p-8 border border-[var(--color-hairline)] shadow-subtle hover:shadow-soft transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[var(--color-canvas-soft)] rounded-lg">
                  <Camera className="h-6 w-6 text-[var(--color-link)]" />
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--color-mute)] group-hover:text-[var(--color-ink)] transition-colors" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">New Assessment</h2>
              <p className="text-[var(--color-body)] mb-6">
                Visit a manufacturing unit, document their processes, and get instant AI analysis
              </p>
              <div className="space-y-2">
                {[
                  "Photo documentation",
                  "Voice notes transcription",
                  "AI process analysis",
                  "Automation roadmap"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[var(--color-body)]">
                    <div className="w-1 h-1 bg-[var(--color-body)] rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Recent Assessments */}
          <div className="bg-white rounded-lg p-8 border border-[var(--color-hairline)] shadow-subtle">
            <h2 className="text-2xl font-semibold mb-6">Recent Assessments</h2>
            <div className="space-y-4">
              {[
                { name: "ABC Steel Works", date: "2 days ago", status: "AI Analysis Complete" },
                { name: "Pune Auto Parts", date: "1 week ago", status: "Recommendations Generated" },
                { name: "Mumbai Textiles", date: "2 weeks ago", status: "In Progress" }
              ].map((assessment) => (
                <div key={assessment.name} className="flex items-center justify-between p-4 bg-[var(--color-canvas-soft)] rounded-lg">
                  <div>
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm text-[var(--color-body)]">{assessment.date}</div>
                  </div>
                  <span className="text-xs px-3 py-1 bg-white border border-[var(--color-hairline)] rounded-full">
                    {assessment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Mic, label: "Voice Notes", href: "/field/voice" },
            { icon: FileText, label: "Process Templates", href: "/field/templates" },
            { icon: Zap, label: "AI Insights", href: "/field/insights" }
          ].map((action) => (
            <Link key={action.label} href={action.href} className="bg-white rounded-lg p-4 border border-[var(--color-hairline)] hover:shadow-subtle transition-shadow">
              <action.icon className="h-5 w-5 mb-2 text-[var(--color-link)]" />
              <div className="text-sm font-medium">{action.label}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
