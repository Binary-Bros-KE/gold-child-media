import React, { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminAuthModal from './components/AdminAuthModal';
import useAdminAuth from './hooks/useAdminAuth';
import DashboardTab from './tabs/DashboardTab';
import AdminManagementTab from './tabs/AdminManagementTab';
import ApplicationsTab from './tabs/ApplicationsTab';
import BlankTab from './tabs/BlankTab';
import CoursesTab from './tabs/CoursesTab';
import AdmissionsTab from './tabs/AdmissionsTab';
import StudentsTab from './tabs/StudentsTab';
import AlumniTab from './tabs/AlumniTab';
import FinanceTab from './tabs/FinanceTab';

const tabTitles = {
  dashboard: 'Dashboard',
  applications: 'Applications',
  admissions: 'Admissions',
  students: 'Students',
  finance: 'Finance',
  courses: 'Courses',
  alumni: 'Alumni',
  'admin-management': 'Admin Management'
};

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { token, user, isCheckingAuth, isLoggingIn, authError, login, logout } = useAdminAuth();

  const isAuthenticated = Boolean(token && user);

  const activeContent = useMemo(() => {
    if (activeTab === 'dashboard') {
      return <DashboardTab token={token} />;
    }

    if (activeTab === 'applications') {
      return <ApplicationsTab token={token} />;
    }

    if (activeTab === 'admissions') {
      return <AdmissionsTab token={token} />;
    }

    if (activeTab === 'courses') {
      return <CoursesTab token={token} />;
    }

    if (activeTab === 'students') {
      return <StudentsTab token={token} />;
    }

    if (activeTab === 'alumni') {
      return <AlumniTab token={token} />;
    }

    if (activeTab === 'finance') {
      return <FinanceTab token={token} />;
    }

    if (activeTab === 'admin-management') {
      return <AdminManagementTab token={token} currentUser={user} />;
    }

    return <BlankTab title={tabTitles[activeTab] || 'Tab'} />;
  }, [activeTab, token, user]);

  const handleLogin = async (credentials) => {
    await login(credentials);
  };

  return (
    <>
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={logout}>
        {activeContent}
      </AdminLayout>

      {!isCheckingAuth && !isAuthenticated ? (
        <AdminAuthModal
          onSubmit={handleLogin}
          isLoading={isLoggingIn}
          errorMessage={authError}
        />
      ) : null}

      {isCheckingAuth ? (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70'>
          <p className='rounded-lg bg-white px-6 py-3 font-semibold text-secondary'>Checking authentication...</p>
        </div>
      ) : null}
    </>
  );
}
