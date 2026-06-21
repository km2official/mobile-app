import { Outlet, useLocation, Link } from 'react-router';
import { Home, ClipboardList, Wallet as WalletIcon, User } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/bookings', icon: ClipboardList, label: 'Bookings' },
    { path: '/wallet', icon: WalletIcon, label: 'Wallet' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-3 grid grid-cols-4 gap-2 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
