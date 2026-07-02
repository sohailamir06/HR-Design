import {
  CalendarMinus,
  Clock,
  FileText,
  Home,
  LogOut,
  PlaneTakeoff,
  Settings,
  UserCog,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { cn } from '../../utils/cn.js';

const navigationItems = [
  { label: 'Dashboard', page: 'dashboard', icon: Home },
  { label: 'Employees', page: 'employees', icon: Users },
  { label: 'Salary', page: 'salary', icon: Wallet },
  { label: 'Leave', page: 'leave', icon: CalendarMinus },
  { label: 'User Management', page: 'user-management', icon: UserCog },
  { label: 'Settings', page: 'settings', icon: Settings },
];

const quickActions = [
  { label: 'Apply Leave', icon: PlaneTakeoff, className: 'bg-emerald-50 text-accent-mint hover:bg-emerald-100' },
  { label: 'Add Employee', icon: UserPlus, className: 'bg-sky-50 text-accent-sky hover:bg-sky-100' },
  { label: 'Leave Request', icon: FileText, className: 'bg-rose-50 text-accent-rose hover:bg-rose-100' },
  { label: 'Attendance', icon: Clock, className: 'bg-brand-50 text-brand-700 hover:bg-brand-100' },
];

export function Sidebar({ currentPage, onAddEmployeeClick, onApplyLeaveClick, onNavigate }) {
  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-[#EEE0FA] lg:flex">
      <div className="flex items-center gap-3 p-6">
        <span className="flex size-8 items-center justify-center rounded bg-brand-600 text-lg font-bold text-white">P</span>
        <span className="font-bold leading-tight text-ink">LeafFirst Softwares Pvt. Ltd.</span>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-1 px-4 py-4">
        {navigationItems.map(({ label, page, icon: Icon }) => {
          const active = currentPage === page;

          return (
            <button
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-colors',
                active ? 'bg-brand-600 text-white shadow-sm shadow-brand-200/60' : 'text-muted hover:bg-brand-50 hover:text-ink',
              )}
              key={label}
              onClick={page === 'dashboard' || page === 'employees' ? () => onNavigate(page) : undefined}
              type="button"
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      <section aria-labelledby="quick-actions-heading" className="mx-4 mb-4 rounded-xl border border-line bg-panel/70 p-4">
        <h2 className="mb-3 pl-2 text-xs font-bold uppercase tracking-wider text-muted" id="quick-actions-heading">
          Quick Actions
        </h2>
        <div className="space-y-2">
          {quickActions.map(({ label, icon: Icon, className }) => (
            <button
              className={cn('focus-ring flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors', className)}
              key={label}
              onClick={
                label === 'Apply Leave'
                  ? onApplyLeaveClick
                  : label === 'Add Employee'
                    ? onAddEmployeeClick
                    : undefined
              }
              type="button"
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <div className="border-t border-line p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar alt="Admin" initials="A" />
          <div>
            <p className="text-sm font-bold text-ink">Admin</p>
            <p className="text-xs text-muted">Super Admin</p>
          </div>
        </div>
        <Button className="w-full" icon={LogOut}>Sign out</Button>
      </div>
    </aside>
  );
}
