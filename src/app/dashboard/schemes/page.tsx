import Link from "next/link";
import { ArrowLeft, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { SCHEMES, checkEligibility } from "@/lib/schemes";

const mockBusiness = {
  employees: 35,
  industry: "Manufacturing",
  turnover: 25000000,
  location: "Pune, Maharashtra"
};

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <nav className="bg-white border-b border-[var(--color-hairline)]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-[var(--color-canvas-soft)] rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Government Schemes</h1>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Eligible Schemes for Your Business</h2>
          <p className="text-[var(--color-body)]">
            Based on your profile: {mockBusiness.employees} employees, {mockBusiness.industry}, ₹{(mockBusiness.turnover/100000).toFixed(0)}L turnover
          </p>
        </div>

        <div className="grid gap-6">
          {SCHEMES.map((scheme) => {
            const eligibility = checkEligibility(mockBusiness, scheme);

            return (
              <div key={scheme.id} className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{scheme.name}</h3>
                        {eligibility.eligible ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle className="h-3 w-3" />
                            Eligible ({eligibility.score}%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                            <AlertCircle className="h-3 w-3" />
                            Partial Match ({eligibility.score}%)
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-body)] mb-3">{scheme.description}</p>
                      <div className="text-sm">
                        <span className="font-medium">Max Amount:</span> ₹{(scheme.maxAmount/100000).toFixed(0)}L
                        <span className="mx-3 text-[var(--color-mute)]">•</span>
                        <span className="font-medium">Ministry:</span> {scheme.ministry}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Required Documents</h4>
                      <ul className="space-y-2">
                        {scheme.documents.map((doc, idx) => (
                          <li key={idx} className="text-sm text-[var(--color-body)] flex items-center gap-2">
                            <div className="w-1 h-1 bg-[var(--color-body)] rounded-full" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {eligibility.reasons.length > 0 && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Eligibility Notes</h4>
                      <ul className="space-y-1">
                        {eligibility.reasons.map((reason, idx) => (
                          <li key={idx} className="text-sm text-amber-800">• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex gap-3">
                    <a
                      href={scheme.applicationUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium hover:bg-[#000]"
                    >
                      Apply Now
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <button className="px-4 py-2 border border-[var(--color-hairline)] rounded-full text-sm hover:bg-[var(--color-canvas-soft)]">
                      Save Scheme
                    </button>
                    <button className="px-4 py-2 border border-[var(--color-hairline)] rounded-full text-sm hover:bg-[var(--color-canvas-soft)]">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
