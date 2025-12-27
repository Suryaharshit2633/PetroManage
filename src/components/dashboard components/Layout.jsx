
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Wrench,
  FileCheck,
  BarChart3
} from 'lucide-react';

export function Layout() {
  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/' },
    { icon: <Package size={18} />, label: 'Assets', path: '/assets' },
    { icon: <TrendingUp size={18} />, label: 'Production', path: '/production' },
    { icon: <Wrench size={18} />, label: 'Maintanance', path: '/maintanance' },
    { icon: <FileCheck size={18} />, label: 'Compliance', path: '/compliance' },
    { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/analytics' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-x-hidden">
      <header className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* LEFT SIDE: Logo Section */}
          <div className="shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">PetroManage</h1>
            <p className="text-[10px] md:text-xs text-gray-500">Operations Management</p>
          </div>

          {/* RIGHT SIDE: Navigation and Profile */}
          <div className="flex items-center gap-6 overflow-hidden">
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap
                    ${isActive 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-slate-800'}
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Profile Section */}
            <div className="flex items-center shrink-0 border-l pl-6 border-gray-100">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium shrink-0 shadow-sm">
                OM
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
``
