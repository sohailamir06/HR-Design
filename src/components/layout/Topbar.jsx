import { Bell, ChevronDown, Menu } from 'lucide-react';
import { Avatar } from '../ui/Avatar.jsx';
import { Button } from '../ui/Button.jsx';

export function Topbar({ title }) {
  return (
    <header className="z-10 flex items-center justify-between border-b border-line bg-panel px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Button aria-label="Open navigation" className="px-2.5 lg:hidden" icon={Menu} variant="ghost" />
        <h1 className="text-xl font-bold text-ink">{title}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button aria-label="Notifications" className="focus-ring relative rounded-lg p-2 text-muted hover:text-ink" type="button">
          <Bell aria-hidden="true" className="size-5" />
          <span className="absolute right-1 top-1 size-2.5 rounded-full border-2 border-panel bg-accent-rose" />
        </button>
        <button className="focus-ring flex items-center gap-3 border-l border-line py-1 pl-4" type="button">
          <Avatar alt="Admin User" className="size-10" initials="AU" />
          <span className="hidden text-left md:block">
            <span className="block text-sm font-bold text-ink">Admin User</span>
            <span className="block text-xs text-muted">Super Admin</span>
          </span>
          <ChevronDown aria-hidden="true" className="size-4 text-muted" />
        </button>
      </div>
    </header>
  );
}
