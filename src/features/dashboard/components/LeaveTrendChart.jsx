import { Card } from '../../../components/ui/Card.jsx';
import { months } from '../../../data/dashboard.js';

export function LeaveTrendChart() {
  return (
    <Card className="p-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="font-bold text-ink">Leave Trend (2026)</h3>
        <select aria-label="Chart year" className="rounded-md border-line bg-panel py-1 pl-2 pr-8 text-sm text-ink shadow-sm focus:border-brand-600 focus:ring-brand-600">
          <option>Year 2026</option>
        </select>
      </div>
      <div className="mb-4 flex gap-4 text-xs font-medium text-muted">
        <span className="flex items-center gap-1"><span className="h-1 w-3 rounded bg-brand-600" /> Leaves Taken</span>
        <span className="flex items-center gap-1"><span className="h-1 w-3 rounded bg-accent-rose" /> Leave Deductions</span>
      </div>
      <div className="relative h-52 w-full text-xs text-muted/70">
        <div className="absolute bottom-6 left-0 top-0 flex w-6 flex-col justify-between pr-2 text-right">
          {[40, 30, 20, 10, 0].map((label) => <span key={label}>{label}</span>)}
        </div>
        <div className="absolute bottom-0 left-8 right-0 flex justify-between px-2">
          {months.map((month) => <span key={month}>{month}</span>)}
        </div>
        <div className="absolute bottom-6 left-8 right-0 top-2 border-b border-l border-line">
          <span className="absolute top-1/4 block w-full border-t border-line/60" />
          <span className="absolute top-1/2 block w-full border-t border-line/60" />
          <span className="absolute top-3/4 block w-full border-t border-line/60" />
        </div>
        <svg aria-label="Leave trend line chart" className="absolute bottom-6 left-8 right-0 top-2 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" preserveAspectRatio="none" role="img" viewBox="0 0 100 100">
          <polyline fill="none" points="0,80 10,70 20,70 30,50 40,40 50,30 60,35 70,30 80,45 90,60 100,75" stroke="#9D32CD" strokeWidth="2" />
          <polyline fill="none" points="0,95 10,95 20,95 30,90 40,95 50,90 60,95 70,90 80,90 90,95 100,95" stroke="#D04473" strokeWidth="2" />
          <circle cx="0" cy="80" fill="#FFFBFF" r="3" stroke="#9D32CD" strokeWidth="2" />
          <circle cx="50" cy="30" fill="#FFFBFF" r="3" stroke="#9D32CD" strokeWidth="2" />
          <circle cx="100" cy="75" fill="#FFFBFF" r="3" stroke="#9D32CD" strokeWidth="2" />
          <circle cx="50" cy="90" fill="#FFFBFF" r="3" stroke="#D04473" strokeWidth="2" />
        </svg>
      </div>
    </Card>
  );
}
