import { Download, FileText } from 'lucide-react';
import { Card } from '../../../components/ui/Card.jsx';
import { juneDeductions, juneLeaves } from '../../../data/dashboard.js';

function ReportHeader({ title, tone }) {
  const headerTone = tone === 'orange' ? 'bg-amber-50/70' : 'bg-brand-50';
  const iconTone = tone === 'orange' ? 'text-accent-amber' : 'text-brand-600';

  return (
    <div className={`flex items-center justify-between border-b border-line p-4 ${headerTone}`}>
      <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
        <FileText aria-hidden="true" className={`size-4 ${iconTone}`} />
        {title}
      </h3>
      <button aria-label={`Download ${title}`} className="focus-ring rounded p-1 text-accent-mint hover:text-emerald-700" type="button">
        <Download aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

export function MiniReports() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden">
        <ReportHeader title="Leaves - June 2026" tone="orange" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-brand-50 text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Employee Name</th>
                <th className="px-4 py-2 text-center font-medium">Leave</th>
                <th className="px-4 py-2 text-center font-medium">Leave Deduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink">
              {juneLeaves.map((row) => (
                <tr key={row.employee}>
                  <td className="px-4 py-2">{row.employee}</td>
                  <td className="px-4 py-2 text-center">{row.leave}</td>
                  <td className="px-4 py-2 text-center text-accent-rose">{row.deduction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <ReportHeader title="Leave Deductions - June 2026" tone="blue" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-brand-50 text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Employee Name</th>
                <th className="px-4 py-2 text-right font-medium">Deduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink">
              {juneDeductions.map((row) => (
                <tr key={row.employee}>
                  <td className="px-4 py-2">{row.employee}</td>
                  <td className="px-4 py-2 text-right text-accent-rose">{row.deduction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
