import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <i className="fas fa-tools text-white"></i>
            </div>
            <span className="text-xl font-bold text-gray-800">Home<span className="text-blue-600">Servi</span></span>
          </div>
          <p className="text-gray-600">Trusted professionals for every corner of your home.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/services" className="hover:text-blue-600">Services</Link></li>
            <li><Link to="#how-it-works" className="hover:text-blue-600">How it works</Link></li>
            <li><Link to="/providers" className="hover:text-blue-600">Providers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Contact</h4>
          <p className="text-gray-600">support@homeservi.example</p>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm pb-6">© 2025 HomeServi. All rights reserved. <br /> By Himanshu Vishwakarma</div>
    </footer>
  );
};

export default Footer;
