import { LogoIcon, DashboardIcon, LeadsIcon, SettingsIcon } from '../common/Icons';

const Sidebar = ({ activePage, setActivePage }) => {
  const NavItem = ({ icon, label, pageName }) => (
    <button
      onClick={() => setActivePage(pageName)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        activePage === pageName 
        ? 'bg-slate-100 text-blue-600' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900' 
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <aside className="w-64 bg-white text-slate-800 flex-shrink-0 p-4 flex flex-col border-r border-slate-200">
      <div className="mb-8 border-b border-slate-200 pb-4">
       
        <LogoIcon className="h-10 w-auto text-slate-800" />
      </div>
      <nav className="space-y-2">
        <NavItem icon={<DashboardIcon className="h-5 w-5" />} label="Dashboard" pageName="dashboard" />
        <NavItem icon={<LeadsIcon className="h-5 w-5" />} label="Leads" pageName="leads" />
        <NavItem icon={<SettingsIcon className="h-5 w-5" />} label="LogOut" pageName="LogOut" />
      </nav>
      <div className="mt-auto text-center text-slate-500 text-xs">
        <p>&copy; 2025 Assignment from @Civil Guruji.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
