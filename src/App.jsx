import { useEffect } from 'react';
import { AppShell } from './components/layout/AppShell.jsx';
import { env } from './config/env.js';
import { DashboardPage } from './features/dashboard/DashboardPage.jsx';

export default function App() {
  useEffect(() => {
    document.title = env.appName;
  }, []);

  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
