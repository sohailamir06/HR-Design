export function SectionHeader({ title, tone }) {
  const headerTone = tone === 'orange' ? 'bg-amber-50/70' : 'bg-brand-50';

  return (
    <div className={`flex items-center justify-between border-b border-line p-4 ${headerTone}`}>
      <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
        {title}
      </h3>
    </div>
  );
}
