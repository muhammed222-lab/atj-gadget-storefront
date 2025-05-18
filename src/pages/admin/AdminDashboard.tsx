
import React, { useState, useEffect } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Users, Package, ShoppingCart, Star, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AdminProductList from '@/components/admin/AdminProductList';
import AdminOrderList from '@/components/admin/AdminOrderList';
import AdminUserList from '@/components/admin/AdminUserList';
import AdminReviews from '@/components/admin/AdminReviews';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/products')) {
      setActiveTab('products');
    } else if (path.includes('/admin/orders')) {
      setActiveTab('orders');
    } else if (path.includes('/admin/users')) {
      setActiveTab('users');
    } else if (path.includes('/admin/reviews')) {
      setActiveTab('reviews');
    } else {
      setActiveTab('products'); // Default tab
    }
  }, [location.pathname]);
  
  // If user is not authenticated or not an admin, redirect to login
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`
          bg-white border-r w-64 fixed inset-y-0 left-0 z-20 transition-transform duration-300
          ${isMobileMenuOpen ? 'transform-none' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/c14be410-97d0-4bd3-b058-35b4fe96b1cd.png" 
                alt="ALLTHINGSJESS" 
                className="h-10"
              />
            </Link>
            <div className="mt-4">
              <h2 className="text-sm font-medium">Logged in as:</h2>
              <p className="text-atj font-medium">{user?.name || 'Admin User'}</p>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/admin/products"
                  className={`
                    flex items-center px-4 py-3 rounded-md 
                    ${activeTab === 'products' 
                      ? 'bg-atj text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => {
                    setActiveTab('products');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Package size={18} className="mr-3" />
                  Products
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/admin/orders"
                  className={`
                    flex items-center px-4 py-3 rounded-md 
                    ${activeTab === 'orders' 
                      ? 'bg-atj text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => {
                    setActiveTab('orders');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart size={18} className="mr-3" />
                  Orders
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/admin/users"
                  className={`
                    flex items-center px-4 py-3 rounded-md 
                    ${activeTab === 'users' 
                      ? 'bg-atj text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => {
                    setActiveTab('users');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Users size={18} className="mr-3" />
                  Users
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/admin/reviews"
                  className={`
                    flex items-center px-4 py-3 rounded-md 
                    ${activeTab === 'reviews' 
                      ? 'bg-atj text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => {
                    setActiveTab('reviews');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Star size={18} className="mr-3" />
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={logout}
            >
              <LogOut size={18} className="mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b px-6 py-4">
          <h1 className="text-2xl font-medium">
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'reviews' && 'Review Management'}
          </h1>
        </header>
        
        <main className="p-6">
          {activeTab === 'products' && <AdminProductList />}
          {activeTab === 'orders' && <AdminOrderList />}
          {activeTab === 'users' && <AdminUserList />}
          {activeTab === 'reviews' && <AdminReviews />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
