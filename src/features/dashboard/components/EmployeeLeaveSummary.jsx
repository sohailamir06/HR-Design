import { ArrowRight, Download, Search } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { employeeLeaveSummary, filters, months } from '../../../data/dashboard.js';
import { cn } from '../../../utils/cn.js';

function LeaveCell({ value, isDeduction }) {
  const isZero = value === '0';
  const isFuture = value === '-';
  const isPositiveDeduction = isDeduction && !isZero && !isFuture;

  return (
    <td
      className={cn(
        'border-r border-line px-2 py-3',
        isZero && 'text-muted/60',
        isPositiveDeduction && 'font-medium text-accent-rose',
      )}
    >
      {value}
    </td>
  );
}

export function EmployeeLeaveSummary() {
  return (
    <Card className="mt-6 flex flex-col overflow-hidden">
      <div className="border-b border-line p-6">
        <h3 className="mb-4 text-lg font-bold text-ink">Employee Leave Summary - 2026</h3>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <select
                aria-label={filter.label}
                className="rounded-md border-line bg-panel py-1.5 pl-3 pr-8 text-sm text-ink shadow-sm focus:border-brand-600 focus:ring-brand-600"
                key={filter.label}
              >
                {filter.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ))}
            <label className="relative">
              <span className="sr-only">Search employee</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-muted" />
              <input className="w-48 rounded-md border-line bg-panel py-1.5 pl-8 pr-3 text-sm text-ink shadow-sm focus:border-brand-600 focus:ring-brand-600" placeholder="Search employee..." type="search" />
            </label>
            <Button className="rounded-md px-3 py-1.5">Reset</Button>
          </div>
          <Button icon={Download}>Export CSV</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-xs">
          <thead className="border-b border-line bg-brand-50 text-muted">
            <tr>
              <th className="min-w-40 border-r border-line px-4 py-3 text-left font-medium" rowSpan="2">Employee Name</th>
              {months.map((month) => (
                <th className="border-b border-r border-line px-2 py-1 font-medium" colSpan="2" key={month}>{month}</th>
              ))}
              <th className="border-l border-line px-2 py-3 font-bold text-brand-600" rowSpan="2">Total<br />Leave</th>
              <th className="px-2 py-3 font-bold text-brand-600" rowSpan="2">Total<br />Deduction</th>
            </tr>
            <tr className="text-[10px]">
              {months.flatMap((month) => [
                <th className="border-r border-line px-1 py-1 font-normal" key={`${month}-leave`}>Leave</th>,
                <th className="border-r border-line px-1 py-1 font-normal" key={`${month}-deduction`}>Ded.</th>,
              ])}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-panel text-ink">
            {employeeLeaveSummary.map((row) => (
              <tr className="hover:bg-brand-50" key={row.employee}>
                <th className="border-r border-line px-4 py-3 text-left font-medium">{row.employee}</th>
                {row.months.map((month, index) => (
                  <FragmentCells key={`${row.employee}-${months[index]}`} month={month} />
                ))}
                <td className="border-l border-line bg-brand-50 px-2 py-3 font-bold text-brand-600">{row.totalLeave}</td>
                <td className="bg-brand-50 px-2 py-3 font-bold text-brand-600">{row.totalDeduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-line p-4 text-center">
        <a className="inline-flex items-center justify-center gap-1 text-sm font-medium text-brand-600 hover:underline" href="#">
          View full summary <ArrowRight aria-hidden="true" className="size-3" />
        </a>
      </div>
    </Card>
  );
}

function FragmentCells({ month }) {
  return (
    <>
      <LeaveCell value={month.leave} />
      <LeaveCell isDeduction value={month.deduction} />
    </>
  );
}
