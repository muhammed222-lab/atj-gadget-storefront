
import React, { useState } from 'react';
import { X, Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order, updateOrderStatus } from '@/services/DataService';
import { downloadOrderPdf } from '@/utils/pdfGenerator';

interface AdminOrderDetailProps {
  order: Order;
  onClose: () => void;
}

const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({ order: initialOrder, onClose }) => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState(order.trackingId || '');
  
  const handleStatusChange = async (status: Order['status']) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedOrder = await updateOrderStatus(order.id, status);
      
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
      setLoading(false);
    }
  };
  
  const handleDownloadReceipt = () => {
    downloadOrderPdf(order);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Order Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Order Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${
                order.status === 'delivered' 
                  ? 'text-green-600' 
                  : order.status === 'shipped'
                  ? 'text-blue-600'
                  : order.status === 'processing'
                  ? 'text-yellow-600'
                  : 'text-gray-600'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            {order.trackingId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking ID:</span>
                <span>{order.trackingId}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span>{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>{order.customer.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Address:</span>
              <div className="mt-1">{order.customer.address}</div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Country:</span>
              <span>{order.customer.country}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="mb-8">
        <h3 className="font-medium text-lg mb-4">Order Items</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Package size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                        {item.color && (
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 mr-1">Color:</span>
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Status Management */}
      <div className="border rounded-lg p-6 mb-8">
        <h3 className="font-medium text-lg mb-4">Update Order Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="status-pending" 
                name="status"
                checked={order.status === 'pending'}
                onChange={() => handleStatusChange('pending')}
                className="h-4 w-4 text-atj focus:ring-atj border-gray-300"
                disabled={loading}
              />
              <label htmlFor="status-pending" className="ml-2 text-gray-700">
                Pending
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Order has been placed but not processed
            </p>
          </div>
          
          <div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="status-processing" 
                name="status"
                checked={order.status === 'processing'}
                onChange={() => handleStatusChange('processing')}
                className="h-4 w-4 text-atj focus:ring-atj border-gray-300"
                disabled={loading}
              />
              <label htmlFor="status-processing" className="ml-2 text-gray-700">
                Processing
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Order is being processed and packed
            </p>
          </div>
          
          <div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="status-shipped" 
                name="status"
                checked={order.status === 'shipped'}
                onChange={() => handleStatusChange('shipped')}
                className="h-4 w-4 text-atj focus:ring-atj border-gray-300"
                disabled={loading}
              />
              <label htmlFor="status-shipped" className="ml-2 text-gray-700">
                Shipped
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Order has been shipped to the customer
            </p>
          </div>
          
          <div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="status-delivered" 
                name="status"
                checked={order.status === 'delivered'}
                onChange={() => handleStatusChange('delivered')}
                className="h-4 w-4 text-atj focus:ring-atj border-gray-300"
                disabled={loading}
              />
              <label htmlFor="status-delivered" className="ml-2 text-gray-700">
                Delivered
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Order has been delivered to the customer
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="tracking-id" className="block text-sm font-medium text-gray-700 mb-1">
            Tracking ID
          </label>
          <div className="flex">
            <input
              type="text"
              id="tracking-id"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID"
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
            />
            <Button
              disabled={!trackingId || loading}
              className="bg-atj text-white hover:bg-atj-light rounded-l-none"
            >
              <Check size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={handleDownloadReceipt}
          disabled={loading}
        >
          Download Receipt
        </Button>
        <Button
          onClick={onClose}
          className="bg-atj text-white hover:bg-atj-light"
          disabled={loading}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
