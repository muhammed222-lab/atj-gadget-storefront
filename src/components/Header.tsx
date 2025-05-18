
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleUserIconClick = () => {
    navigate('/account');
  };
  
  const categories = [
    { name: "Headsets", path: "/category/headsets" },
    { name: "Ring Lights", path: "/category/ring-lights" },
    { name: "Cameras", path: "/category/cameras" },
    { name: "Mice", path: "/category/mice" },
    { name: "Home Tools", path: "/category/home-tools" },
  ];
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/c14be410-97d0-4bd3-b058-35b4fe96b1cd.png" 
              alt="ALLTHINGSJESS" 
              className="h-12 md:h-16"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="text-gray-700 hover:text-atj font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-atj"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={handleUserIconClick}
              className="p-2 text-gray-700 hover:text-atj hidden md:block"
            >
              <User size={20} />
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 text-gray-700 hover:text-atj relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-atj text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-atj md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="pt-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-atj"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-3/4 max-w-xs p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/c14be410-97d0-4bd3-b058-35b4fe96b1cd.png" 
                  alt="ALLTHINGSJESS" 
                  className="h-10"
                />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path} 
                  className="text-gray-700 hover:text-atj font-medium py-2 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <Link 
                to="/account" 
                className="text-gray-700 hover:text-atj font-medium py-2 border-b flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-2" />
                My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
