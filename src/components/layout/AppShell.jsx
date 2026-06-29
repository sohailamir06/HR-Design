import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

export function AppShell({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface text-ink">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar title="Dashboard" />
        <div className="flex-1 overflow-y-auto bg-surface p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
