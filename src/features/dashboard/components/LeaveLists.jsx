import { ArrowRight, User } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { leaveToday, pendingRequests } from '../../../data/dashboard.js';

export function EmployeesOnLeave() {
  return (
    <Card className="flex flex-col p-4">
      <SectionHeader title="Employees On Leave Today" action={<a className="text-sm font-medium text-brand-600 hover:underline" href="#">View all</a>} />
      <div className="flex-1 space-y-4">
        {leaveToday.map((employee) => (
          <article className="flex items-center justify-between rounded-lg border border-transparent p-3 transition-colors hover:border-line hover:bg-brand-50" key={employee.name}>
            <div className="flex items-center gap-3">
              <Avatar alt={employee.name} initials={employee.initials} tone={employee.tone} />
              <div>
                <h4 className="text-sm font-bold text-ink">{employee.name}</h4>
                <p className="text-xs text-muted">{employee.type}</p>
              </div>
            </div>
            <span className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-medium text-accent-mint">{employee.duration}</span>
          </article>
        ))}
      </div>
    </Card>
  );
}

export function PendingLeaveRequests() {
  return (
    <Card className="flex flex-col p-4">
      <SectionHeader title="Pending Leave Requests" action={<a className="text-sm font-medium text-brand-600 hover:underline" href="#">View all</a>} />
      <div className="flex-1 space-y-4">
        {pendingRequests.map((request) => (
          <article className="grid grid-cols-[minmax(0,1.3fr)_minmax(5rem,1fr)_auto_auto] items-center gap-3 border-b border-line pb-3 text-sm last:border-0 last:pb-0" key={request.name}>
            <div className="flex min-w-0 items-center gap-2">
              <User aria-hidden="true" className="size-4 shrink-0 text-muted" />
              <h4 className="truncate font-medium text-ink">{request.name}</h4>
            </div>
            <span className="text-xs text-muted">{request.type}</span>
            <span className="text-right text-xs font-medium text-ink">{request.duration}</span>
            <span className="rounded bg-amber-50 px-2 py-1 text-center text-xs font-medium text-accent-amber">Pending</span>
          </article>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a className="inline-flex items-center justify-center gap-1 text-sm font-medium text-brand-600 hover:underline" href="#">
          View all requests <ArrowRight aria-hidden="true" className="size-3" />
        </a>
      </div>
    </Card>
  );
}
