
import React, { useState, useEffect } from 'react';
import { Star, Search, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review, getProductById, Product } from '@/services/DataService';

interface ExtendedReview extends Review {
  productName?: string;
}

const AdminReviews = () => {
  // For demo purposes, hardcoded reviews
  const initialReviews: ExtendedReview[] = [
    {
      id: 'r1',
      productId: 'p1',
      userId: 'u1',
      userName: 'GamerPro123',
      rating: 5,
      comment: 'Best gaming headset I\'ve ever used. The noise cancellation is perfect for intense gaming sessions.',
      date: '2023-04-10T15:30:00Z',
      productName: 'Pro Gaming Headset with Noise Cancellation'
    },
    {
      id: 'r2',
      productId: 'p1',
      userId: 'u2',
      userName: 'AudioEnthusiast',
      rating: 4,
      comment: 'Great sound quality, but could be more comfortable for long sessions.',
      date: '2023-04-15T09:45:00Z',
      productName: 'Pro Gaming Headset with Noise Cancellation'
    },
    {
      id: 'r3',
      productId: 'p2',
      userId: 'u3',
      userName: 'StreamerJane',
      rating: 5,
      comment: 'Perfect lighting for my streams! Easy to set up and adjust.',
      date: '2023-04-18T14:20:00Z',
      productName: '10" LED Ring Light with Tripod Stand'
    },
    {
      id: 'r4',
      productId: 'p8',
      userId: 'u4',
      userName: 'PhotoHobbyist',
      rating: 5,
      comment: 'Amazing camera for beginners. The quality is outstanding for the price.',
      date: '2023-04-20T11:10:00Z',
      productName: 'DSLR Camera with 18-55mm Lens'
    }
  ];
  
  const [reviews, setReviews] = useState<ExtendedReview[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<ExtendedReview | null>(null);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  
  // In a real app, this would fetch review data
  useEffect(() => {
    // This would be a real fetch in a production app
    setReviews(initialReviews);
  }, []);
  
  useEffect(() => {
    // When a review is selected, fetch the related product info
    const fetchProductInfo = async () => {
      if (selectedReview) {
        try {
          setLoading(true);
          const product = await getProductById(selectedReview.productId);
          if (product) {
            setProductInfo(product);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error fetching product:', err);
          setLoading(false);
        }
      }
    };
    
    fetchProductInfo();
  }, [selectedReview]);
  
  // Filter reviews based on search query
  const filteredReviews = reviews.filter(review => {
    return (
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.productName && review.productName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
  // Simulate review actions (in a real app these would call API endpoints)
  const handleApproveReview = (reviewId: string) => {
    // Demo only - just toggle the selected state
    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview(null);
    } else {
      const review = reviews.find(r => r.id === reviewId) || null;
      setSelectedReview(review);
    }
  };
  
  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      // Demo only - remove from local state
      setReviews(reviews.filter(r => r.id !== reviewId));
      if (selectedReview?.id === reviewId) {
        setSelectedReview(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium">Review Management</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <tr 
                    key={review.id} 
                    className={`hover:bg-gray-50 ${
                      selectedReview?.id === review.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {review.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.productName || `Product ${review.productId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${
                              i < review.rating 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApproveReview(review.id)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Review Detail */}
        <div>
          {selectedReview ? (
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Review Details</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-500"
                >
                  <X size={16} />
                </Button>
              </div>
              
              {loading ? (
                <div className="py-4 text-center">Loading product info...</div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Product</h4>
                    <p className="font-medium">{selectedReview.productName || `Product ${selectedReview.productId}`}</p>
                    {productInfo && (
                      <div className="mt-2 flex">
                        <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={productInfo.images[0]} 
                            alt={productInfo.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">User</h4>
                    <p>{selectedReview.userName}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={`${
                            i < selectedReview.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                    <p>{new Date(selectedReview.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Comment</h4>
                    <p className="text-gray-700">{selectedReview.comment}</p>
                  </div>
                  
                  <div className="border-t pt-4 flex space-x-2">
                    <Button
                      className="flex-1 bg-green-600 text-white hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleDeleteReview(selectedReview.id)}
                    >
                      <AlertTriangle size={16} className="mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-6 text-center text-gray-500">
              <div className="py-12">
                <Star size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a review to see details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
