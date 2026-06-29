import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Card } from '../../../components/ui/Card.jsx';
import { calendarDays, dailyEvents } from '../../../data/dashboard.js';
import { cn } from '../../../utils/cn.js';

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function LeaveCalendar() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="mb-4 font-bold text-ink">Leave Calendar</h3>
        <div className="mb-4 flex items-center justify-between">
          <button aria-label="Previous month" className="focus-ring rounded p-1 text-muted hover:text-ink" type="button"><ChevronLeft className="size-4" /></button>
          <span className="text-sm font-medium">June 2026</span>
          <button aria-label="Next month" className="focus-ring rounded p-1 text-muted hover:text-ink" type="button"><ChevronRight className="size-4" /></button>
        </div>
        <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted">
          {weekdays.map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {calendarDays.map(({ day, muted, selected, holiday, hasLeave }, index) => (
            <span
              className={cn(
                'relative mx-1 rounded-full py-1',
                muted && 'text-muted/40',
                holiday && 'font-bold text-brand-600',
                selected && 'bg-brand-600 text-white',
              )}
              key={`${day}-${index}`}
            >
              {day}
              {hasLeave ? <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-mint" /> : null}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-4 text-xs text-muted">
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-accent-mint" /> On Leave</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-accent-amber" /> Holiday</span>
        </div>
      </Card>

      <Card className="flex flex-col border-line bg-brand-50 p-6 shadow-inner">
        <h3 className="mb-4 font-bold text-ink">Friday, 19 June</h3>
        <div className="flex-1 space-y-3 overflow-y-auto">
          {dailyEvents.map((event) => (
            <article className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel p-3 shadow-sm" key={event.title}>
              <div className="flex min-w-0 items-start gap-3">
                <User aria-hidden="true" className={cn('mt-1 size-4 shrink-0', event.tone === 'blue' ? 'text-accent-sky' : 'text-muted')} />
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-medium text-ink">{event.title}</h4>
                  <p className="text-xs text-muted">{event.meta}</p>
                </div>
              </div>
              {event.action ? (
                <button className="focus-ring shrink-0 rounded border border-line px-2 py-1 text-xs text-muted hover:bg-brand-50" type="button">
                  {event.action}
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
