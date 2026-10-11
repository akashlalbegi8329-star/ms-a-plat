import { ArrowLeft, Camera, Mic, Upload, Zap } from "lucide-react";
import Link from "next/link";

export default function NewAssessment() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <nav className="bg-white border-b border-[var(--color-hairline)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/field" className="p-2 hover:bg-[var(--color-canvas-soft)] rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">New Factory Assessment</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle">
          {/* Business Info */}
          <div className="p-8 border-b border-[var(--color-hairline)]">
            <h2 className="text-xl font-semibold mb-6">Business Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Business Name", placeholder: "e.g., ABC Manufacturing" },
                { label: "Industry Type", placeholder: "e.g., Metal Fabrication" },
                { label: "Location", placeholder: "City, State" },
                { label: "Number of Employees", placeholder: "e.g., 25-50" }
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium mb-2">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-link)] bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Process Documentation */}
          <div className="p-8 border-b border-[var(--color-hairline)]">
            <h2 className="text-xl font-semibold mb-6">Process Documentation</h2>
            <p className="text-[var(--color-body)] mb-6">Document the manufacturing workflow to enable AI analysis</p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Camera, title: "Photo Documentation", desc: "Capture process steps" },
                { icon: Mic, title: "Voice Notes", desc: "Record observations" },
                { icon: Upload, title: "Upload Files", desc: "Add existing docs" }
              ].map((method) => (
                <button
                  key={method.title}
                  className="group p-6 border-2 border-dashed border-[var(--color-hairline)] rounded-lg hover:border-[var(--color-link)] hover:bg-[var(--color-canvas-soft)] transition-all text-left"
                >
                  <method.icon className="h-8 w-8 text-[var(--color-link)] mb-3" />
                  <div className="font-medium mb-1">{method.title}</div>
                  <div className="text-sm text-[var(--color-body)]">{method.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Analysis Preview */}
          <div className="p-8">
            <div className="flex items-start gap-4 p-6 bg-[var(--color-canvas-soft)] rounded-lg">
              <Zap className="h-6 w-6 text-[var(--color-violet)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-[var(--color-body)] mb-4">
                  Once you document the processes, our AI will analyze workflows and provide:
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Automation opportunity scoring",
                    "Cost-benefit analysis for each recommendation",
                    "Implementation timeline",
                    "Required investment estimates",
                    "Government scheme eligibility"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[var(--color-body)] rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[#000] transition-colors">
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
