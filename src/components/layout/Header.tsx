import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { items } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className={isScrolled ? 'text-primary-600' : 'text-primary-500'} />
              <span className={`ml-2 text-xl font-display font-bold ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Sweetopia
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? isScrolled 
                      ? 'text-primary-600' 
                      : 'text-white font-bold'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Right Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/products"
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-colors relative ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link
              to="/cart"
              className={`p-2 mr-2 rounded-full transition-colors relative ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`p-2 rounded-md ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg sm:px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === item.href
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
          >
            <User className="w-5 h-5 mr-2" />
            {isAuthenticated ? 'My Account' : 'Sign In'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;