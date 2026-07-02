import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

const pageTitles = {
  dashboard: 'Dashboard',
  employees: 'Employees',
};

export function AppShell({ children, currentPage, onAddEmployeeClick, onApplyLeaveClick, onNavigate }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface text-ink">
      <Sidebar currentPage={currentPage} onAddEmployeeClick={onAddEmployeeClick} onApplyLeaveClick={onApplyLeaveClick} onNavigate={onNavigate} />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar title={pageTitles[currentPage] ?? 'Dashboard'} />
        <div className="flex-1 overflow-y-auto bg-surface p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
