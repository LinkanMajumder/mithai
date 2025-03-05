import React, { useState } from 'react';
import { BarChart, DollarSign, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  
  // Mock data
  const stats = {
    revenue: {
      value: 12489.75,
      change: 12.5,
      trend: 'up',
    },
    orders: {
      value: 356,
      change: 8.2,
      trend: 'up',
    },
    customers: {
      value: 245,
      change: 5.3,
      trend: 'up',
    },
    avgOrderValue: {
      value: 35.08,
      change: 2.1,
      trend: 'down',
    },
  };
  
  const recentOrders = [
    { id: 'ORD-123456', customer: 'John Doe', date: '2023-05-15', status: 'Delivered', total: 89.97 },
    { id: 'ORD-123455', customer: 'Jane Smith', date: '2023-05-14', status: 'Processing', total: 124.50 },
    { id: 'ORD-123454', customer: 'Robert Johnson', date: '2023-05-14', status: 'Shipped', total: 67.25 },
    { id: 'ORD-123453', customer: 'Emily Davis', date: '2023-05-13', status: 'Delivered', total: 42.99 },
    { id: 'ORD-123452', customer: 'Michael Wilson', date: '2023-05-12', status: 'Delivered', total: 78.50 },
  ];
  
  const topProducts = [
    { name: 'Chocolate Truffle Box', sales: 78, revenue: 1949.22 },
    { name: 'Assorted Macarons', sales: 65, revenue: 1234.35 },
    { name: 'Luxury Gift Hamper', sales: 42, revenue: 2099.58 },
    { name: 'Artisan Fudge Selection', sales: 39, revenue: 662.61 },
    { name: 'Classic Chocolate Chip Cookies', sales: 36, revenue: 539.64 },
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.revenue.value)}</h3>
            </div>
            <div className="p-2 bg-primary-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.revenue.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${stats.revenue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.revenue.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs. previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.orders.value}</h3>
            </div>
            <div className="p-2 bg-secondary-50 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.orders.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${stats.orders.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.orders.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs. previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Customers</p>
              <h3 className="text-2xl font-bold mt-1">{stats.customers.value}</h3>
            </div>
            <div className="p-2 bg-accent-50 rounded-lg">
              <Users className="w-6 h-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.customers.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${stats.customers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.customers.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs. previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.avgOrderValue.value)}</h3>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <BarChart className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.avgOrderValue.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${stats.avgOrderValue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.avgOrderValue.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs. previous period</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent orders */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <a href="/admin/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all orders
            </a>
          </div>
        </div>
        
        {/* Top products */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold">Top Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <a href="/admin/products" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;