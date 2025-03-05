import React from 'react';
import { useAuthStore } from '../store/authStore';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Total Products</h3>
              <p className="text-3xl font-bold text-primary-700">12</p>
            </div>
            
            <div className="bg-accent-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-accent-900 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-accent-700">25</p>
            </div>
            
            <div className="bg-success-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-success-900 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-success-700">$1,234</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">Welcome back, {user?.email}!</p>
              <p className="text-gray-600 mt-2">This is a basic admin dashboard. More features coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 