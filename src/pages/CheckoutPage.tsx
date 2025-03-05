import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { formatPrice, generateOrderNumber } from '../lib/utils';
import toast from 'react-hot-toast';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const totalPrice = getTotalPrice();
  
  // Calculate shipping cost based on method and total
  const shippingCost = 
    shippingMethod === 'express' 
      ? 12.99 
      : (totalPrice >= 50 ? 0 : 5.99);
  
  // Calculate tax (assume 8%)
  const taxRate = 0.08;
  const taxAmount = totalPrice * taxRate;
  
  // Calculate order total
  const orderTotal = totalPrice + shippingCost + taxAmount;
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Please Sign In to Continue</h2>
              <p className="text-gray-600 mb-6">
                You need to be signed in to complete your purchase.
              </p>
              <Button href="/login" fullWidth>
                Sign In
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                Don't have an account?{' '}
                <a href="/register" className="text-primary-600 hover:text-primary-700">
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to cart if cart is empty
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">
                Add some items to your cart before proceeding to checkout.
              </p>
              <Button href="/products" fullWidth>
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would call an API to process the order
    const orderNumber = generateOrderNumber();
    
    // Simulate order processing
    toast.loading('Processing your order...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Order #${orderNumber} placed successfully!`);
      clearCart();
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              {/* Shipping information */}
              {step === 'shipping' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                  </div>
                  
                  <form onSubmit={handleShippingSubmit} className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="standard"
                            name="shippingMethod"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="standard" className="ml-3 block">
                            <span className="text-sm font-medium text-gray-700">Standard Shipping</span>
                            <span className="block text-sm text-gray-500">
                              Delivery in 3-5 business days
                            </span>
                            <span className="block text-sm font-medium text-gray-700 mt-1">
                              {totalPrice >= 50 ? 'Free' : formatPrice(5.99)}
                            </span>
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="express"
                            name="shippingMethod"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="express" className="ml-3 block">
                            <span className="text-sm font-medium text-gray-700">Express Shipping</span>
                            <span className="block text-sm text-gray-500">
                              Delivery in 1-2 business days
                            </span>
                            <span className="block text-sm font-medium text-gray-700 mt-1">
                              {formatPrice(12.99)}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Payment information */}
              {step === 'payment' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Payment Information</h2>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit} className="p-6">
                    <div className="mb-6">
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          placeholder="XXX"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="billingAddress"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="billingAddress" className="ml-2 text-sm text-gray-700">
                          Billing address same as shipping address
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep('shipping')}
                      >
                        Back to Shipping
                      </Button>
                      <Button type="submit">
                        Review Order
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Order review */}
              {step === 'review' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Review Your Order</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.country}</p>
                        <p className="mt-2">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                        <button 
                          onClick={() => setStep('shipping')}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium">Credit Card</p>
                        <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                        <p>Expires: {paymentInfo.expiryDate}</p>
                        <button 
                          onClick={() => setStep('payment')}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Shipping Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium">
                          {shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {shippingMethod === 'standard' 
                            ? 'Delivery in 3-5 business days' 
                            : 'Delivery in 1-2 business days'
                          }
                        </p>
                        <p className="font-medium mt-1">
                          {shippingMethod === 'standard' && totalPrice >= 50 
                            ? 'Free' 
                            : formatPrice(shippingCost)
                          }
                        </p>
                        <button 
                          onClick={() => setStep('shipping')}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Order Items</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <ul className="divide-y divide-gray-200">
                          {items.map((item) => (
                            <li key={item.id} className="py-3 flex justify-between">
                              <div className="flex">
                                <div className="w-12 h-12">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep('payment')}
                      >
                        Back to Payment
                      </Button>
                      <Button 
                        type="button"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({items.length} items)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingMethod === 'standard' && totalPrice >= 50 
                        ? 'Free' 
                        : formatPrice(shippingCost)
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(orderTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <Truck className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Shipping on Orders Over $50</p>
                      <p className="text-gray-500 text-sm">
                        For standard shipping within the continental US
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Secure Checkout</p>
                      <p className="text-gray-500 text-sm">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;