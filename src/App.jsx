import { useEffect, useState } from 'react';
import { AppShell } from './components/layout/AppShell.jsx';
import { env } from './config/env.js';
import { AddEmployeeModal } from './features/dashboard/components/AddEmployeeModal.jsx';
import { DashboardPage } from './features/dashboard/DashboardPage.jsx';
import { ApplyLeaveModal } from './features/dashboard/components/ApplyLeaveModal.jsx';

export default function App() {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);

  useEffect(() => {
    document.title = env.appName;
  }, []);

  return (
    <>
      <AppShell onAddEmployeeClick={() => setIsAddEmployeeOpen(true)} onApplyLeaveClick={() => setIsApplyLeaveOpen(true)}>
        <DashboardPage />
      </AppShell>
      <AddEmployeeModal isOpen={isAddEmployeeOpen} onClose={() => setIsAddEmployeeOpen(false)} />
      <ApplyLeaveModal isOpen={isApplyLeaveOpen} onClose={() => setIsApplyLeaveOpen(false)} />
    </>
  );
}
