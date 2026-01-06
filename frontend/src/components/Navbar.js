import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <i className="fas fa-tools text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-gray-800">Home<span className="text-blue-600">Servi</span></span>
            </Link>
            <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
              <Link to="/" className="text-blue-600 font-medium border-b-2 border-blue-600 px-1 py-2">Home</Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-600 px-1 py-2">Services</Link>
              <Link to="/providers" className="text-gray-600 hover:text-blue-600 px-1 py-2">Providers</Link>
              <Link to="#how-it-works" className="text-gray-600 hover:text-blue-600 px-1 py-2">How It Works</Link>
              <Link to="#about" className="text-gray-600 hover:text-blue-600 px-1 py-2">About</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Sign Up</Link>
            <button onClick={toggleMenu} className="lg:hidden p-2">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-blue-600 font-medium">Home</Link>
              <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Services</Link>
              <Link to="/providers" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Providers</Link>
              <Link to="/how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600">How It Works</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
