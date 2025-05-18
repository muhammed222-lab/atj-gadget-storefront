
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/lovable-uploads/c14be410-97d0-4bd3-b058-35b4fe96b1cd.png" 
                alt="ALLTHINGSJESS" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for quality gadgets, electronics, and home tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-atj">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-atj">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-atj">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-atj">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-atj">All Products</Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-600 hover:text-atj">Track Order</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-atj">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-medium mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/headsets" className="text-gray-600 hover:text-atj">Headsets</Link>
              </li>
              <li>
                <Link to="/category/ring-lights" className="text-gray-600 hover:text-atj">Ring Lights</Link>
              </li>
              <li>
                <Link to="/category/cameras" className="text-gray-600 hover:text-atj">Cameras</Link>
              </li>
              <li>
                <Link to="/category/mice" className="text-gray-600 hover:text-atj">Mice</Link>
              </li>
              <li>
                <Link to="/category/home-tools" className="text-gray-600 hover:text-atj">Home Tools</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-atj mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Tech Avenue, Silicon Valley, CA 94000
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-atj mr-2 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-atj mr-2 flex-shrink-0" />
                <span className="text-gray-600">support@allthingsjess.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row md:justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ALLTHINGSJESS. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-atj">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-atj">Terms of Service</Link>
            <Link to="/shipping" className="text-gray-500 text-sm hover:text-atj">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
