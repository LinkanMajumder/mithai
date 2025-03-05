import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { formatPrice, formatDate } from '../lib/utils';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();
  
  // Get order details from location state or use mock data
  const orderDetails = location.state?.order || {
    id: 'ORD-123456-7890',
    date: new Date().toISOString(),
    total: 89.97,
    items: [
      { name: 'Chocolate Truffle Box', quantity: 1, price: 24.99 },
      { name: 'Assorted Macarons', quantity: 2, price: 18.99 },
      { name: 'Artisan Fudge Selection', quantity: 1, price: 16.99 },
    ],
    shipping: {
      method: 'Standard Shipping',
      address: '123 Main St, Anytown, CA 12345',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    payment: {
      method: 'Credit Card',
      last4: '1234',
    },
  };
  
  // Clear cart on component mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-6 bg-primary-50 border-b border-primary-100 flex items-center">
              <CheckCircle className="w-8 h-8 text-primary-600 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
                <p className="text-gray-600">Thank you for your purchase.</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-medium">{orderDetails.id}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{formatDate(orderDetails.date)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{orderDetails.payment.method} (**** {orderDetails.payment.last4})</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Order Total</p>
                    <p className="font-medium">{formatPrice(orderDetails.total)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Items Ordered</h2>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderDetails.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start mb-4">
                    <Truck className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{orderDetails.shipping.method}</p>
                      <p className="text-gray-600 text-sm">{orderDetails.shipping.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-gray-600 text-sm">{formatDate(orderDetails.shipping.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/products" variant="outline">
                  Continue Shopping
                </Button>
                <Button href="/account">
                  View Order History
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-start">
              <Package className="w-6 h-6 text-primary-600 mr-4" />
              <div>
                <h2 className="text-lg font-bold mb-2">What's Next?</h2>
                <p className="text-gray-600 mb-4">
                  We're preparing your order for shipment. You'll receive an email with tracking information once your order ships.
                </p>
                <p className="text-gray-600">
                  If you have any questions about your order, please contact our customer service team at{' '}
                  <a href="mailto:support@sweetopia.com" className="text-primary-600 hover:text-primary-700">
                    support@sweetopia.com
                  </a>
                  {' '}or call us at{' '}
                  <a href="tel:+11234567890" className="text-primary-600 hover:text-primary-700">
                    +1 (123) 456-7890
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;