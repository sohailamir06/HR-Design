import { cn } from '../../utils/cn.js';

export function Avatar({ initials, alt, src, className, tone = 'gray' }) {
  const tones = {
    gray: 'bg-brand-100 text-brand-700',
    blue: 'bg-sky-100 text-accent-sky',
    orange: 'bg-amber-100 text-accent-amber',
  };

  if (src) {
    return <img alt={alt} className={cn('size-10 rounded-full object-cover', className)} src={src} />;
  }

  return (
    <span
      aria-label={alt}
      className={cn('inline-flex size-10 items-center justify-center rounded-full text-sm font-bold', tones[tone], className)}
      role="img"
    >
      {initials}
    </span>
  );
}
