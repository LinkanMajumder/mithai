import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="text-primary-400" />
              <span className="ml-2 text-xl font-display font-bold text-white">Sweetopia</span>
            </div>
            <p className="text-gray-400">
              Delicious treats delivered to your doorstep. Handcrafted with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=chocolates" className="text-gray-400 hover:text-primary-400 transition-colors">Chocolates</Link>
              </li>
              <li>
                <Link to="/products?category=candies" className="text-gray-400 hover:text-primary-400 transition-colors">Candies</Link>
              </li>
              <li>
                <Link to="/products?category=pastries" className="text-gray-400 hover:text-primary-400 transition-colors">Pastries</Link>
              </li>
              <li>
                <Link to="/products?category=gift-boxes" className="text-gray-400 hover:text-primary-400 transition-colors">Gift Boxes</Link>
              </li>
              <li>
                <Link to="/products?category=seasonal" className="text-gray-400 hover:text-primary-400 transition-colors">Seasonal Treats</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Sweet Street</p>
              <p>Dessert City, DC 12345</p>
              <p className="mt-4">
                <a href="tel:+11234567890" className="hover:text-primary-400 transition-colors">+1 (123) 456-7890</a>
              </p>
              <p>
                <a href="mailto:info@sweetopia.com" className="hover:text-primary-400 transition-colors">info@sweetopia.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Sweetopia. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;