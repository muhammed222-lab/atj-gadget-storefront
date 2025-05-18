
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { placeOrder, Order } from '@/services/DataService';
import { downloadOrderPdf } from '@/utils/pdfGenerator';

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address ||
        !customerInfo.city || !customerInfo.state || !customerInfo.postalCode ||
        !customerInfo.country) {
      setError('Please fill in all customer information fields.');
      return false;
    }
    
    if (!paymentInfo.cardNumber || !paymentInfo.nameOnCard || 
        !paymentInfo.expiryDate || !paymentInfo.cvv) {
      setError('Please fill in all payment information fields.');
      return false;
    }
    
    // Simple validation for demo purposes
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number should be 16 digits.');
      return false;
    }
    
    if (paymentInfo.cvv.length !== 3) {
      setError('CVV should be 3 digits.');
      return false;
    }
    
    return true;
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create an order object
      const orderData = {
        date: new Date().toISOString(),
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.postalCode}`,
          country: countries.find(c => c.code === customerInfo.country)?.name || customerInfo.country,
        },
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          color: item.color,
        })),
        totalAmount: getCartTotal(),
      };
      
      // Submit order
      const newOrder = await placeOrder(orderData);
      setOrder(newOrder);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      setLoading(false);
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
      setLoading(false);
    }
  };
  
  const handleDownloadReceipt = () => {
    if (order) {
      downloadOrderPdf(order);
    }
  };

  // If order is complete, show success page
  if (orderComplete && order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="container mx-auto py-16 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <div className="mb-6 flex justify-center">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h1 className="text-3xl font-medium mb-4">Order Successfully Placed!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your order. Your order has been placed successfully.
              </p>
              
              <div className="border rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.productName} x {item.quantity}
                          {item.color && (
                            <span
                              className="inline-block w-3 h-3 rounded-full ml-2"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="border-atj text-atj hover:bg-atj hover:text-white"
                >
                  Download Receipt
                </Button>
                <Button
                  onClick={() => navigate('/track-order')}
                  className="bg-atj text-white hover:bg-atj-light"
                >
                  Track Your Order
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-medium">Checkout</h1>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <a href="/cart" className="hover:text-atj">Cart</a>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-gray-700">Checkout</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                  {error}
                </div>
              )}
              
              <form onSubmit={handlePlaceOrder}>
                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-lg font-medium mb-4">Customer Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="address" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="city" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={customerInfo.city}
                          onChange={handleCustomerInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          required
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="state" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={customerInfo.state}
                          onChange={handleCustomerInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="postalCode" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Postal/ZIP Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={customerInfo.postalCode}
                          onChange={handleCustomerInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          required
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="country" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={customerInfo.country}
                          onChange={handleCustomerInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          required
                        >
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-lg font-medium">Payment Information</h2>
                    <CreditCard size={20} className="text-gray-400 ml-2" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="cardNumber" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                        maxLength={19}
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="nameOnCard" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={handlePaymentInfoChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="expiryDate" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          maxLength={5}
                          required
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="cvv" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-atj text-white hover:bg-atj-light py-3 text-lg"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 max-h-96 overflow-auto mb-6">
                  {cart.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.color || ''}`} 
                      className="flex border-b pb-4"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          {item.color && (
                            <div className="flex items-center ml-3">
                              <span className="mr-1">Color:</span>
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {getCartTotal() >= 100 ? 'Free' : '$10.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      ${(
                        getCartTotal() + 
                        (getCartTotal() >= 100 ? 0 : 10) + 
                        getCartTotal() * 0.07
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
