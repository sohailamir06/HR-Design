import { cn } from '../../utils/cn.js';

export function Card({ as: Component = 'section', className, children }) {
  return (
    <Component className={cn('rounded-xl border border-line bg-panel shadow-sm shadow-brand-200/20', className)}>
      {children}
    </Component>
  );
}
