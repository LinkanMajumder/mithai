import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuthStore();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      title: 'Products',
      icon: Package,
      path: '/admin/products',
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/admin/customers',
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders',
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b">
        <Link to="/" className="text-xl font-bold text-primary-600">
          SweetHut Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              location.pathname === item.path
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 