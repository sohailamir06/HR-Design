import { pageActions } from '../../data/dashboard.js';
import { Button } from '../../components/ui/Button.jsx';
import { EmployeeLeaveSummary } from './components/EmployeeLeaveSummary.jsx';
import { EmployeesOnLeave, PendingLeaveRequests } from './components/LeaveLists.jsx';
import { LeaveCalendar } from './components/LeaveCalendar.jsx';
import { LeaveTrendChart } from './components/LeaveTrendChart.jsx';
import { MiniReports } from './components/MiniReports.jsx';
import { SummaryCards } from './components/SummaryCards.jsx';

export function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ink">Good morning, Admin</h2>
          <p className="mt-1 text-muted">Here&apos;s what&apos;s happening in your organization today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {pageActions.map(({ label, icon }) => <Button icon={icon} key={label}>{label}</Button>)}
        </div>
      </section>

      <SummaryCards />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <LeaveTrendChart />
        <EmployeesOnLeave />
        <PendingLeaveRequests />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="xl:col-span-2">
          <LeaveCalendar />
        </div>
        <div className="xl:col-span-2">
          <MiniReports />
        </div>
      </section>

      <EmployeeLeaveSummary />
    </div>
  );
}
