// components/Layout.jsx
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
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Package size={20} />, label: 'Assets', path: '/assets' },
    { icon: <TrendingUp size={20} />, label: 'Production', path: '/production' },
    { icon: <Wrench size={20} />, label: 'Maintanance', path: '/maintanance' },
    { icon: <FileCheck size={20} />, label: 'Compliance', path: '/compliance' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header / Navbar Section */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">PetroManage</h1>
              <p className="text-xs text-gray-500">Operations Management</p>
            </div>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm
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
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Operations Manager</p>
              <p className="text-xs text-gray-500">operator@petromanage.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
              OM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* The Outlet renders the child components based on the URL */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}