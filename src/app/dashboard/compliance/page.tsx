import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";

const complianceTasks = [
  {
    id: 1,
    type: "GST Filing",
    title: "Monthly GST Return - GSTR-1",
    dueDate: "2026-10-11",
    daysLeft: 3,
    status: "overdue" as const,
    business: "ABC Steel Works"
  },
  {
    id: 2,
    type: "Labor Law",
    title: "Provident Fund Return",
    dueDate: "2026-10-15",
    daysLeft: 7,
    status: "pending" as const,
    business: "Pune Auto Parts"
  },
  {
    id: 3,
    type: "MSME Registration",
    title: "Udyam Registration Renewal",
    dueDate: "2026-11-01",
    daysLeft: 24,
    status: "pending" as const,
    business: "Mumbai Textiles"
  },
  {
    id: 4,
    type: "Tax Return",
    title: "Annual Return Filing",
    dueDate: "2026-10-05",
    daysLeft: -3,
    status: "completed" as const,
    business: "ABC Steel Works"
  }
];

export default function CompliancePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "text-red-600 bg-red-50 border-red-200";
      case "pending": return "text-amber-600 bg-amber-50 border-amber-200";
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-[var(--color-body)]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return AlertTriangle;
      case "pending": return Clock;
      case "completed": return CheckCircle;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <nav className="bg-white border-b border-[var(--color-hairline)]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-[var(--color-canvas-soft)] rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Compliance Hub</h1>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Overdue", value: "1", color: "text-red-600" },
            { label: "Due Soon", value: "2", color: "text-amber-600" },
            { label: "Completed", value: "12", color: "text-green-600" },
            { label: "Total Tasks", value: "15", color: "text-[var(--color-ink)]" }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-4 border border-[var(--color-hairline)]">
              <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-[var(--color-body)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg border border-[var(--color-hairline)] shadow-subtle overflow-hidden">
          <div className="p-6 border-b border-[var(--color-hairline)]">
            <h2 className="text-lg font-semibold">Upcoming Compliance Tasks</h2>
          </div>

          <div className="divide-y divide-[var(--color-hairline)]">
            {complianceTasks.map((task) => {
              const StatusIcon = getStatusIcon(task.status);
              return (
                <div key={task.id} className="p-6 hover:bg-[var(--color-canvas-soft)] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg border ${getStatusColor(task.status)}`}>
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-[var(--color-body)] mt-1">
                          {task.business} • {task.type}
                        </div>
                        <div className="text-sm text-[var(--color-mute)] mt-1">
                          Due: {new Date(task.dueDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        task.daysLeft < 0 ? 'text-red-600' :
                        task.daysLeft <= 7 ? 'text-amber-600' :
                        'text-[var(--color-body)]'
                      }`}>
                        {task.daysLeft < 0 ? `${Math.abs(task.daysLeft)} days overdue` :
                         task.daysLeft === 0 ? 'Due today' :
                         `${task.daysLeft} days left`}
                      </div>
                      <button className="mt-2 text-sm text-[var(--color-link)] hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-[var(--color-hairline)] p-6">
            <h3 className="font-semibold mb-4">MSME Compliance Checklist</h3>
            <div className="space-y-3">
              {[
                { item: "Udyam Registration", status: "active" },
                { item: "GST Registration", status: "active" },
                { item: "Shop & Establishment License", status: "active" },
                { item: "Pollution Control Board", status: "pending" },
                { item: "Factory License", status: "active" }
              ].map((check) => (
                <div key={check.item} className="flex items-center justify-between">
                  <span className="text-sm">{check.item}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    check.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[var(--color-hairline)] p-6">
            <h3 className="font-semibold mb-4">Document Expiry Alerts</h3>
            <div className="space-y-3">
              {[
                { doc: "GST Certificate", expires: "2026-12-31", days: 84 },
                { doc: "MSME Registration", expires: "2027-01-15", days: 99 },
                { doc: "Trade License", expires: "2026-11-30", days: 53 }
              ].map((doc) => (
                <div key={doc.doc} className="flex items-center justify-between p-3 bg-[var(--color-canvas-soft)] rounded-lg">
                  <div>
                    <div className="text-sm font-medium">{doc.doc}</div>
                    <div className="text-xs text-[var(--color-body)]">
                      Expires {new Date(doc.expires).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--color-mute)]">{doc.days} days</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
