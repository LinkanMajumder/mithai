import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, CreditCard, Edit, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { formatPrice, formatDate } from '../lib/utils';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payment'>('orders');

  // Mock data
  const orders = [
    {
      id: 'ORD-123456',
      date: '2023-05-15',
      status: 'Delivered',
      total: 89.97,
      items: [
        { name: 'Chocolate Truffle Box', quantity: 1 },
        { name: 'Assorted Macarons', quantity: 2 },
      ],
    },
    {
      id: 'ORD-123455',
      date: '2023-05-10',
      status: 'Processing',
      total: 124.50,
      items: [
        { name: 'Luxury Gift Hamper', quantity: 1 },
        { name: 'Artisan Fudge Selection', quantity: 2 },
      ],
    },
  ];

  const addresses = [
    {
      id: '1',
      default: true,
      name: 'Home',
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (123) 456-7890',
    },
    {
      id: '2',
      default: false,
      name: 'Work',
      fullName: 'John Doe',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (123) 456-7891',
    },
  ];

  const paymentMethods = [
    {
      id: '1',
      default: true,
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      name: 'John Doe',
    },
    {
      id: '2',
      default: false,
      type: 'Mastercard',
      last4: '8888',
      expiry: '06/25',
      name: 'John Doe',
    },
  ];

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Account header */}
          <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-8">
            <div className="p-6 flex items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mr-6">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Account tabs */}
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'orders'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  Orders
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'addresses'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  Addresses
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'payment'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  Payment Methods
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div>
              {/* Orders tab */}
              {activeTab === 'orders' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Order History</h2>
                  </div>
                  
                  <div className="p-6">
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                        <Button href="/products">Start Shopping</Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                              </div>
                              <div className="mt-2 sm:mt-0 flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {order.status}
                                </span>
                                <Button 
                                  variant="link" 
                                  size="sm"
                                  href={`/order/${order.id}`}
                                  className="ml-4"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
                                <ul className="space-y-2">
                                  {order.items.map((item, index) => (
                                    <li key={index} className="text-sm">
                                      {item.quantity} x {item.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="border-t border-gray-200 pt-4 flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-bold">{formatPrice(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Addresses tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">My Addresses</h2>
                  </div>
                  
                  <div className="p-6">
                    {addresses.length === 0 ? (
                      <div className="text-center py-8">
                        <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                        <p className="text-gray-500 mb-4">You haven't saved any addresses yet.</p>
                        <Button>Add Address</Button>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {addresses.map((address) => (
                            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                              {address.default && (
                                <div className="mb-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                    Default
                                  </span>
                                </div>
                              )}
                              <h3 className="font-medium mb-1">{address.name}</h3>
                              <p className="text-sm text-gray-600">{address.fullName}</p>
                              <p className="text-sm text-gray-600">{address.address}</p>
                              <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                              <p className="text-sm text-gray-600">{address.country}</p>
                              <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                              <div className="mt-4 flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                {!address.default && (
                                  <Button variant="outline" size="sm">
                                    Set as Default
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button>
                          Add New Address
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Payment methods tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Payment Methods</h2>
                  </div>
                  
                  <div className="p-6">
                    {paymentMethods.length === 0 ? (
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No payment methods saved</h3>
                        <p className="text-gray-500 mb-4">You haven't saved any payment methods yet.</p>
                        <Button>Add Payment Method</Button>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {paymentMethods.map((method) => (
                            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                              {method.default && (
                                <div className="mb-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                    Default
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center mb-2">
                                <div className="w-10 h-6 bg-gray-200 rounded mr-2"></div>
                                <h3 className="font-medium">{method.type} •••• {method.last4}</h3>
                              </div>
                              <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                              <p className="text-sm text-gray-600">{method.name}</p>
                              <div className="mt-4 flex space-x-2">
                                {!method.default && (
                                  <Button variant="outline" size="sm">
                                    Set as Default
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button>
                          Add New Payment Method
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;