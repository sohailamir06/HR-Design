import { Search, SlidersHorizontal, UserPlus } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';
import {
  employeeContactChannels,
  employeeFilters,
  employeeHeroStats,
  employeeHighlights,
  employeeRecords,
} from '../../data/employees.js';
import { cn } from '../../utils/cn.js';

const statTones = {
  sky: 'bg-sky-50 text-accent-sky',
  mint: 'bg-emerald-50 text-accent-mint',
  amber: 'bg-amber-50 text-accent-amber',
  brand: 'bg-brand-50 text-brand-700',
};

const statusTones = {
  Active: 'bg-emerald-50 text-accent-mint',
  Probation: 'bg-amber-50 text-accent-amber',
  Remote: 'bg-sky-50 text-accent-sky',
  'On Leave': 'bg-rose-50 text-accent-rose',
};

export function EmployeePage({ onAddEmployeeClick }) {
  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,247,255,0.98))] shadow-[0_20px_55px_rgba(31,75,124,0.14)]">
        <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent-sky">
              People Directory
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-ink">Employee Management</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Manage employee records, verify department allocation, and keep onboarding data clean with a modern HRMS workspace.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button className="rounded-xl border-transparent bg-sky-600 px-5 py-3 text-white shadow-[0_18px_35px_rgba(22,135,184,0.24)] hover:bg-sky-700" icon={UserPlus} onClick={onAddEmployeeClick} variant="primary">
                Add New Employee
              </Button>
              <Button className="rounded-xl px-5 py-3" icon={SlidersHorizontal}>
                Manage Filters
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            {employeeContactChannels.map(({ label, value, icon: Icon }) => (
              <div className="rounded-2xl border border-sky-100 bg-white/88 p-4 shadow-sm" key={label}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-accent-sky">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {employeeHeroStats.map(({ label, value, meta, icon: Icon, tone }) => (
          <Card className="rounded-[24px] border-white/70 p-5 shadow-[0_16px_40px_rgba(31,75,124,0.08)]" key={label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted">{label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{value}</p>
                <p className="mt-2 text-sm text-muted">{meta}</p>
              </div>
              <span className={cn('flex size-11 items-center justify-center rounded-2xl', statTones[tone])}>
                <Icon className="size-5" />
              </span>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_0.55fr]">
        <Card className="rounded-[28px] border-white/70 p-0 shadow-[0_18px_40px_rgba(31,75,124,0.08)]">
          <div className="flex flex-col gap-4 border-b border-line/80 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink">Employee Directory</h3>
              <p className="mt-1 text-sm text-muted">View and review employee records across departments.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  className="focus-ring w-full rounded-2xl border border-line/80 bg-white py-3 pl-11 pr-4 text-sm text-ink shadow-sm transition placeholder:text-muted/70 hover:border-sky-200 sm:w-72"
                  placeholder="Search employee name or ID"
                  type="text"
                />
              </div>
              <div className="flex gap-3">
                <select className="focus-ring rounded-2xl border border-line/80 bg-white px-4 py-3 text-sm text-ink shadow-sm transition hover:border-sky-200">
                  {employeeFilters.departments.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select className="focus-ring rounded-2xl border border-line/80 bg-white px-4 py-3 text-sm text-ink shadow-sm transition hover:border-sky-200">
                  {employeeFilters.statuses.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line/80">
              <thead className="bg-slate-50/80">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  <th className="px-5 py-4 sm:px-6">Employee</th>
                  <th className="px-5 py-4 sm:px-6">Department</th>
                  <th className="px-5 py-4 sm:px-6">Contact</th>
                  <th className="px-5 py-4 sm:px-6">Status</th>
                  <th className="px-5 py-4 sm:px-6">DOJ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70 bg-white">
                {employeeRecords.map((employee) => (
                  <tr className="transition hover:bg-sky-50/40" key={employee.id}>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <Avatar alt={employee.name} className="size-10" initials={employee.initials} tone="blue" />
                        <div>
                          <p className="font-semibold text-ink">{employee.name}</p>
                          <p className="text-sm text-muted">{employee.id} | {employee.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="font-medium text-ink">{employee.department}</p>
                      <p className="text-sm text-muted">{employee.location}</p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="font-medium text-ink">{employee.email}</p>
                      <p className="text-sm text-muted">{employee.phone}</p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', statusTones[employee.status])}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6 text-sm font-medium text-ink">{employee.doj}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          {employeeHighlights.map(({ title, icon: Icon, items }) => (
            <Card className="rounded-[24px] border-white/70 p-5 shadow-[0_16px_35px_rgba(31,75,124,0.08)]" key={title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-accent-sky">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="text-sm text-muted">Quick team snapshot</p>
                </div>
              </div>
              <div className="space-y-3">
                {items.map(({ label, value }) => (
                  <div className="rounded-2xl border border-line/70 bg-slate-50/70 px-4 py-3" key={label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
                    <p className="mt-1 font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
