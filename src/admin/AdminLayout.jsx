import {
  FaBook,
  FaChalkboardTeacher,
  FaCoins,
  FaFileAlt,
  FaGraduationCap,
  FaTachometerAlt,
  FaUsersCog,
  FaUserCheck,
  FaSignOutAlt
} from 'react-icons/fa';

const ADMIN_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { id: 'applications', label: 'Applications', icon: FaFileAlt },
  { id: 'admissions', label: 'Admissions', icon: FaUserCheck },
  { id: 'students', label: 'Students', icon: FaGraduationCap },
  { id: 'finance', label: 'Finance', icon: FaCoins },
  { id: 'courses', label: 'Courses', icon: FaBook },
  { id: 'alumni', label: 'Alumni', icon: FaChalkboardTeacher },
  { id: 'admin-management', label: 'Admin Management', icon: FaUsersCog }
];

export default function AdminLayout({ activeTab, setActiveTab, user, onLogout, children }) {
  return (
    <div className='min-h-screen bg-slate-100'>
      <style>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Fixed Sidebar */}
      <aside className='fixed left-0 top-0 h-screen w-72 bg-secondary p-6 text-white flex flex-col'>
        <div>
          <img src="/main-logo-dark.png" alt="Goldchild Logo" className='transform -translate-x-6'/>
        </div>

        {/* Scrollable Navigation */}
        <nav className='mt-8 flex-1 overflow-y-auto pr-2 scrollbar-hide'>
          {ADMIN_TABS.map((tab) => (
            <div key={tab.id} className='border-b border-white/15 mb-5 last:border-b-0 cursor-pointer'>
              <button
                type='button'
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-l-2 border-primary text-primary'
                    : 'text-slate-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon className='text-sm opacity-90' />
                <span>{tab.label}</span>
              </button>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          type='button'
          onClick={onLogout}
          className='mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 active:bg-red-800 cursor-pointer'
        >
          <FaSignOutAlt className='text-sm' />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className='ml-72 flex flex-1 flex-col min-h-screen'>
        <header className='flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8'>
          <div>
            <p className='text-lg font-semibold text-secondary'>Admin Panel</p>
            <p className='text-sm text-slate-500'>Large-screen management workspace</p>
          </div>

          <div className='rounded-lg bg-slate-100 px-4 py-2 text-sm text-secondary'>
            {user ? `${user.fullName} (${user.username})` : 'Not Logged In'}
          </div>
        </header>

        <main className='flex-1 p-8'>{children}</main>
      </div>
    </div>
  );
}

export { ADMIN_TABS };
