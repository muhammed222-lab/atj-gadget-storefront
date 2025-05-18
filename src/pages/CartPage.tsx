
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-medium">Shopping Cart</h1>
          </div>
        </div>
        
        <div className="container mx-auto py-12">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <ShoppingBag size={36} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-atj text-white hover:bg-atj-light">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-4 px-6 text-left">Product</th>
                        <th className="py-4 px-4 text-center">Quantity</th>
                        <th className="py-4 px-4 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={`${item.product.id}-${item.color || ''}`} className="border-b">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  <Link 
                                    to={`/product/${item.product.id}`}
                                    className="hover:text-atj"
                                  >
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  {item.color && (
                                    <div className="flex items-center mr-3">
                                      <span className="mr-1">Color:</span>
                                      <div 
                                        className="w-4 h-4 rounded-full" 
                                        style={{ backgroundColor: item.color }}
                                      />
                                    </div>
                                  )}
                                  <span>Price: ${item.product.price.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <button 
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="mx-3 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end">
                              <span className="font-medium mr-4">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button 
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(item.product.id)}
                                aria-label="Remove item"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link to="/products">
                    <Button variant="outline" className="flex items-center">
                      <ArrowRight size={16} className="mr-2 transform rotate-180" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-atj text-white hover:bg-atj-light"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
