import Link from "next/link";
import { Factory, Shield, CreditCard, TrendingUp, FileText, Bell } from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import { AuthGuard } from "@/components/auth/AuthGuard";

function DashboardContent() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <nav className="bg-white border-b border-[var(--color-hairline)]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold">MSME AI</Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-[var(--color-ink)]">Dashboard</Link>
              <Link href="/dashboard/schemes" className="text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]">Schemes</Link>
              <Link href="/dashboard/compliance" className="text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]">Compliance</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-[var(--color-body)]" />
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-display-lg mb-2">Welcome back, Akash</h1>
          <p className="text-[var(--color-body)]">Here's what's happening with your MSME assessments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Assessments", value: "12", icon: Factory, color: "text-[var(--color-link)]" },
            { label: "Schemes Available", value: "8", icon: CreditCard, color: "text-[var(--color-violet)]" },
            { label: "Compliance Tasks", value: "3", icon: Shield, color: "text-[var(--color-warning)]" },
            { label: "ROI Potential", value: "₹45L", icon: TrendingUp, color: "text-[var(--color-success)]" }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-6 border border-[var(--color-hairline)] shadow-subtle">
              <div className="flex items-start justify-between mb-4">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--color-body)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Assessments */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle">
            <div className="p-6 border-b border-[var(--color-hairline)] flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Assessments</h2>
              <Link href="/field" className="text-sm text-[var(--color-link)] hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-[var(--color-hairline)]">
              {[
                { name: "ABC Steel Works", industry: "Metal Fabrication", status: "AI Analysis Complete", roi: "₹12L/year" },
                { name: "Pune Auto Parts", industry: "Automotive", status: "Recommendations Ready", roi: "₹8L/year" },
                { name: "Mumbai Textiles", industry: "Textile", status: "In Progress", roi: "—" }
              ].map((item) => (
                <div key={item.name} className="p-6 hover:bg-[var(--color-canvas-soft)] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-[var(--color-body)]">{item.industry}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[var(--color-success)]">{item.roi}</div>
                      <span className="text-xs px-2 py-1 bg-[var(--color-canvas-soft)] rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Government Schemes */}
          <div className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle">
            <div className="p-6 border-b border-[var(--color-hairline)]">
              <h2 className="text-lg font-semibold">Eligible Schemes</h2>
            </div>
            <div className="p-6 space-y-4">
              {[
                { name: "PMEGP", amount: "₹50L", deadline: "Dec 15" },
                { name: "Credit Guarantee", amount: "₹2Cr", deadline: "Ongoing" },
                { name: "Mudra Loan", amount: "₹10L", deadline: "Apply now" }
              ].map((scheme) => (
                <div key={scheme.name} className="p-4 bg-[var(--color-canvas-soft)] rounded-lg">
                  <div className="font-medium text-sm">{scheme.name}</div>
                  <div className="text-xs text-[var(--color-body)] mt-1">Up to {scheme.amount}</div>
                  <div className="text-xs text-[var(--color-mute)] mt-1">Deadline: {scheme.deadline}</div>
                </div>
              ))}
              <Link href="/dashboard/schemes" className="block text-sm text-[var(--color-link)] hover:underline text-center">
                View all schemes →
              </Link>
            </div>
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="mt-6 bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle">
          <div className="p-6 border-b border-[var(--color-hairline)]">
            <h2 className="text-lg font-semibold">Compliance Alerts</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <FileText className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">GST Filing Due</div>
                <div className="text-sm text-amber-900">
                  Monthly GST return for ABC Steel Works is due in 3 days
                </div>
              </div>
              <button className="text-sm text-[var(--color-link)] hover:underline">
                View Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
