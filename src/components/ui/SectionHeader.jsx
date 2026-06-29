export function SectionHeader({ title, action }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h3 className="font-bold text-ink">{title}</h3>
      {action}
    </div>
  );
}
