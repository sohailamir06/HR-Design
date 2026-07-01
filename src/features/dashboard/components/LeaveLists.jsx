import { ArrowRight, Clock3, User } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { pendingRequests } from '../../../data/dashboard.js';

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    initials: "JD",
    tone: "blue",
    type: "checkin",
    action: "checked in for today's shift",
    time: "2 min ago",
    badge: "Attendance",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    initials: "SW",
    tone: "purple",
    type: "leave",
    action: "submitted a leave request",
    time: "18 min ago",
    badge: "Leave",
  },
  {
    id: 3,
    user: "Michael Brown",
    initials: "MB",
    tone: "green",
    type: "timesheet",
    action: "submitted this week's timesheet",
    time: "45 min ago",
    badge: "Timesheet",
  },
];

export function PendingLeaveRequests() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line">
        <SectionHeader title="Pending Leave Requests" />
      </div>

      <div className="space-y-1 p-4">
        {pendingRequests.map((request) => (
          <article
            key={request.name}
            className="group flex flex-col gap-4 rounded-xl border border-line bg-white p-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <User className="size-5" />
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-ink">
                    {request.name}
                  </h4>
                  <p className="mt-1 text-xs text-muted">
                    {request.type}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  Pending
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {request.duration}
                </span>
              </div>
            </div>
          </article>
        ))}

        <div className="mt-2 text-center">
          <a className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700 hover:underline" href="#">
            View all requests <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </Card>
  );
}

export function RecentActivities() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line">
        <SectionHeader title="Recent Activities" tone="orange" />
      </div>

      <div className="space-y-1 p-4">
        {recentActivities.map((activity) => (
          <article
            key={activity.id}
            className="group flex flex-col gap-4 rounded-xl border border-line bg-white p-2 shadow-sm transition duration-200 hover:bg-brand-50"
          >
            <div className="flex items-start gap-4">
              <Avatar
                alt={activity.user}
                initials={activity.initials}
                tone={activity.tone}
              />

              <div className="min-w-0 flex-1">
                <p className="flex justify-between items-center text-sm leading-6 text-ink">
                  <span><span className="font-semibold">{activity.user}</span> {activity.action}</span>
                  {activity.badge && (
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {activity.badge}
                    </span>
                  )}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-3 text-brand-700" />
                    {activity.time}
                  </span>

                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="mt-2 text-center">
          <a className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700 hover:underline" href="#">
            View all requests <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </Card>
  );
}
