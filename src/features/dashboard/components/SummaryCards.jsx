import { Card } from '../../../components/ui/Card.jsx';
import { cn } from '../../../utils/cn.js';
import { summaryCards } from '../../../data/dashboard.js';

const toneClasses = {
  indigo: 'bg-brand-50 text-brand-600',
  green: 'bg-emerald-50 text-accent-mint',
  orange: 'bg-amber-50 text-accent-amber',
  blue: 'bg-sky-50 text-accent-sky',
  red: 'bg-rose-50 text-accent-rose',
};

export function SummaryCards() {
  return (
    <section aria-label="Dashboard summary" className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {summaryCards.map(({ label, value, helper, icon: Icon, helperIcon: HelperIcon, tone, helperTone }) => (
        <Card className="flex items-center gap-4 p-5" key={label}>
          <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-full', toneClasses[tone])}>
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">{label}</p>
            <p className="text-2xl font-bold text-ink">{value}</p>
            <p className={cn('mt-1 flex items-center gap-1 text-xs text-muted/70', helperTone)}>
              {HelperIcon ? <HelperIcon aria-hidden="true" className="size-3" /> : null}
              {helper}
            </p>
          </div>
        </Card>
      ))}
    </section>
  );
}
