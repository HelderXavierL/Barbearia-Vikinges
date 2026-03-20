// =============================================
// Barbearia Vikings — Admin Layout Shell
// =============================================

import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Scissors, Package, LogOut, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import logo from '../../assets/logo.png';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Agenda', href: '/admin/agenda', icon: Calendar },
  { label: 'Serviços', href: '/admin/servicos', icon: Scissors },
  { label: 'Produtos', href: '/admin/produtos', icon: Package },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-panel border-r border-white/5">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <img src={logo} alt="Vikings" className="w-9 h-9 object-contain" />
          <div>
            <span className="text-sm font-display font-bold text-white tracking-wider">VIKINGS</span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-brand-400 font-body">Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 font-body',
                  active
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/15'
                    : 'text-[#5A5650] hover:text-[#8A8680] hover:bg-white/5',
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/5 p-3">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#5A5650] hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5 font-body"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/5 bg-panel/50 backdrop-blur-sm">
          <h2 className="text-lg font-display font-semibold text-white">
            {sidebarLinks.find((l) => l.href === location.pathname)?.label || 'Admin'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-brand-400 font-body">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
