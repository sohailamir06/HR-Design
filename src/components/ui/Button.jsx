import { cn } from '../../utils/cn.js';

const variants = {
  primary: 'border-transparent bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border-line bg-panel text-ink hover:bg-brand-50',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-brand-50 hover:text-ink',
};

export function Button({ as: Component = 'button', className, variant = 'secondary', icon: Icon, children, ...props }) {
  const componentProps = Component === 'button' ? { type: 'button', ...props } : props;

  return (
    <Component
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
        variants[variant],
        className,
      )}
      {...componentProps}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null}
      {children}
    </Component>
  );
}
