
import React, { useState } from 'react';
import { CheckCircle2, Circle, Package, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrderById, Order } from '@/services/DataService';
import { downloadOrderPdf } from '@/utils/pdfGenerator';

const TrackOrderPage = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchDone, setSearchDone] = useState(false);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderIdInput.trim()) {
      setError('Please enter an order ID');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const orderData = await getOrderById(orderIdInput.trim());
      
      if (!orderData) {
        setError('Order not found. Please check your order ID and try again.');
        setOrder(null);
      } else {
        setOrder(orderData);
      }
      
      setSearchDone(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to fetch order data. Please try again.');
      setOrder(null);
      setSearchDone(true);
      setLoading(false);
    }
  };
  
  const handleDownloadReceipt = () => {
    if (order) {
      downloadOrderPdf(order);
    }
  };
  
  const getStatusIndex = (status: Order['status']): number => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-atj text-white py-12">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Track Your Order</h1>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Enter your order ID below to check the status of your order.
              You can find your order ID in the confirmation email you received.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="Enter your order ID (e.g. ORD-12345)"
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-atj text-white hover:bg-atj-light"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Track Order'}
                </Button>
              </form>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-md mb-8">
                {error}
              </div>
            )}
            
            {searchDone && !error && !order && (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md mb-8">
                No order found with that ID. Please check your order ID and try again.
              </div>
            )}
            
            {order && (
              <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-xl font-medium mb-2">
                    Order #{order.id}
                  </h2>
                  <div className="text-gray-600">
                    <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  {order.trackingId && (
                    <p className="mt-1 text-gray-600">
                      Tracking ID: {order.trackingId}
                    </p>
                  )}
                </div>
                
                {/* Order status timeline */}
                <div className="mb-8">
                  <h3 className="font-medium mb-6">Order Status</h3>
                  
                  <div className="relative">
                    {/* Progress line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                    
                    {/* Timeline items */}
                    <div className="space-y-8">
                      <div className="relative flex items-start">
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center z-10
                          ${getStatusIndex(order.status) >= 0 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'}
                        `}>
                          {getStatusIndex(order.status) >= 0 
                            ? <CheckCircle2 size={14} /> 
                            : <Circle size={14} />}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-medium ${
                            getStatusIndex(order.status) >= 0 
                              ? 'text-green-600' 
                              : 'text-gray-500'
                          }`}>
                            Order Placed
                          </h4>
                          <p className="text-sm text-gray-600">
                            Your order has been placed successfully
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-start">
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center z-10
                          ${getStatusIndex(order.status) >= 1 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'}
                        `}>
                          {getStatusIndex(order.status) >= 1 
                            ? <CheckCircle2 size={14} /> 
                            : <Circle size={14} />}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-medium ${
                            getStatusIndex(order.status) >= 1 
                              ? 'text-green-600' 
                              : 'text-gray-500'
                          }`}>
                            Processing
                          </h4>
                          <p className="text-sm text-gray-600">
                            Your order is being processed and packed
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-start">
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center z-10
                          ${getStatusIndex(order.status) >= 2 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'}
                        `}>
                          {getStatusIndex(order.status) >= 2 
                            ? <CheckCircle2 size={14} /> 
                            : <Circle size={14} />}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-medium ${
                            getStatusIndex(order.status) >= 2 
                              ? 'text-green-600' 
                              : 'text-gray-500'
                          }`}>
                            Shipped
                          </h4>
                          <p className="text-sm text-gray-600">
                            Your order has been shipped
                            {order.trackingId && ` (Tracking ID: ${order.trackingId})`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-start">
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center z-10
                          ${getStatusIndex(order.status) >= 3 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'}
                        `}>
                          {getStatusIndex(order.status) >= 3 
                            ? <CheckCircle2 size={14} /> 
                            : <Circle size={14} />}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-medium ${
                            getStatusIndex(order.status) >= 3 
                              ? 'text-green-600' 
                              : 'text-gray-500'
                          }`}>
                            Delivered
                          </h4>
                          <p className="text-sm text-gray-600">
                            Your order has been delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order details */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Order Details</h3>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">Customer Name</td>
                        <td className="py-3 font-medium">{order.customer.name}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">Email Address</td>
                        <td className="py-3">{order.customer.email}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">Shipping Address</td>
                        <td className="py-3">{order.customer.address}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600">Total Amount</td>
                        <td className="py-3 font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Order items */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Package size={24} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                              {item.color && (
                                <span className="ml-2 inline-flex items-center">
                                  Color: 
                                  <span 
                                    className="ml-1 w-3 h-3 rounded-full inline-block"
                                    style={{ backgroundColor: item.color }}
                                  />
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleDownloadReceipt}
                    className="bg-atj text-white hover:bg-atj-light"
                  >
                    Download Receipt
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
