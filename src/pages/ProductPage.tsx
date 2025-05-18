
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Check, ChevronRight, Truck, Shield, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarRating from '@/components/StarRating';
import { Product } from '@/components/ProductCard';
import { getProductById, getProductReviews, Review, addProductReview } from '@/services/DataService';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  
  const { cart, addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!id) {
          setError('Product ID is required');
          setLoading(false);
          return;
        }
        
        const productData = await getProductById(id);
        if (!productData) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        
        setProduct(productData);
        
        // Set default selected color if available
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        
        // Fetch reviews
        const reviewsData = await getProductReviews(id);
        setReviews(reviewsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data');
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor);
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedColor);
      // Redirect to checkout
      window.location.href = '/checkout';
    }
  };
  
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !product) return;
    
    try {
      const reviewData = {
        productId: product.id,
        userId: user?.id || 'anonymous',
        userName: user?.name || 'Anonymous User',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      };
      
      const addedReview = await addProductReview(reviewData);
      setReviews([...reviews, addedReview]);
      setNewReview({ rating: 0, comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading product...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-medium mb-4">Error</h2>
          <p className="text-gray-600 mb-8">{error || 'Product not found'}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto">
            <div className="flex items-center text-sm text-gray-500">
              <a href="/" className="hover:text-atj">Home</a>
              <ChevronRight size={16} className="mx-1" />
              <a href="/products" className="hover:text-atj">Products</a>
              <ChevronRight size={16} className="mx-1" />
              <a href={`/category/${product.category.toLowerCase()}`} className="hover:text-atj">
                {product.category}
              </a>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-gray-700">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product Detail */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '500px' }}
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer rounded border-2 overflow-hidden ${
                        selectedImage === index ? 'border-atj' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-2 flex items-center">
                  <span className="text-gray-600 mr-2">{product.brand}</span>
                  {product.inStock ? (
                    <span className="text-green-600 text-sm flex items-center">
                      <Check size={16} className="mr-1" /> In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm">Out of Stock</span>
                  )}
                </div>
                
                <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="mb-6">
                  <span className="text-2xl font-medium text-atj mr-3">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 text-lg line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Color options */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
                    <div className="flex space-x-3">
                      {product.colors.map((color) => (
                        <div 
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                            selectedColor === color 
                              ? 'border-atj' 
                              : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                          aria-label={`Select color: ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                      {quantity}
                    </div>
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-atj text-atj hover:bg-atj hover:text-white"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1 bg-atj text-white hover:bg-atj-light"
                  >
                    Buy Now
                  </Button>
                </div>
                
                {/* Shipping info */}
                <div className="border rounded-md p-4 mb-6">
                  <div className="flex items-start mb-3">
                    <Truck size={20} className="text-atj mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-gray-500">Orders over $100 qualify for free shipping</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <Shield size={20} className="text-atj mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">1-Year Warranty</h4>
                      <p className="text-sm text-gray-500">All products come with a 1-year warranty</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RotateCw size={20} className="text-atj mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">30-Day Returns</h4>
                      <p className="text-sm text-gray-500">Not satisfied? Return within 30 days for a full refund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product description and reviews */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-medium mb-4">Product Description</h2>
                  <div className="prose">
                    <p>
                      {`The ${product.name} is a high-quality product from ${product.brand}, 
                      designed to provide excellent performance for a variety of uses. 
                      Whether you're looking for professional equipment or something for 
                      everyday use, this product offers the perfect blend of functionality, 
                      durability, and style.`}
                    </p>
                    <p className="mt-4">
                      {`With its sleek design and premium build quality, the ${product.name} 
                      is an excellent addition to your tech collection. It features the latest 
                      technology to ensure optimal performance and user satisfaction.`}
                    </p>
                  </div>
                </div>
                
                {/* Reviews */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-2">
                      <StarRating rating={product.rating} />
                      <span className="ml-2 text-gray-600">
                        Based on {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  
                  {/* Review list */}
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex items-center mb-2">
                            <StarRating rating={review.rating} />
                            <span className="ml-2 font-medium">{review.userName}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    )}
                  </div>
                  
                  {/* Add review form */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                    
                    {isAuthenticated ? (
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                          </label>
                          <StarRating 
                            rating={newReview.rating} 
                            interactive={true}
                            onRatingChange={(rating) => 
                              setNewReview({ ...newReview, rating })
                            }
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label 
                            htmlFor="comment" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Review
                          </label>
                          <textarea
                            id="comment"
                            rows={4}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                            value={newReview.comment}
                            onChange={(e) => 
                              setNewReview({ ...newReview, comment: e.target.value })
                            }
                            required
                          ></textarea>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="bg-atj text-white hover:bg-atj-light"
                          disabled={newReview.rating === 0 || !newReview.comment.trim()}
                        >
                          Submit Review
                        </Button>
                      </form>
                    ) : (
                      <p className="text-gray-500">
                        Please <a href="/login" className="text-atj hover:underline">log in</a> to 
                        write a review.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Specifications */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                  <h2 className="text-xl font-medium mb-4">Specifications</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Brand</td>
                        <td className="py-2 font-medium">{product.brand}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Category</td>
                        <td className="py-2 font-medium">{product.category}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Availability</td>
                        <td className="py-2 font-medium">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Rating</td>
                        <td className="py-2 font-medium">{product.rating} / 5</td>
                      </tr>
                      {product.colors && product.colors.length > 0 && (
                        <tr className="border-b">
                          <td className="py-2 text-gray-600">Available Colors</td>
                          <td className="py-2 font-medium">
                            <div className="flex space-x-1">
                              {product.colors.map((color) => (
                                <div 
                                  key={color}
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                      {product.tags && product.tags.length > 0 && (
                        <tr>
                          <td className="py-2 text-gray-600">Tags</td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-1">
                              {product.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="bg-gray-100 px-2 py-1 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
