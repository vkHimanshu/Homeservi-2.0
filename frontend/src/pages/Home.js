import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Home Services<br />
            <span className="text-yellow-400">At Your Doorstep</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with verified professionals for all your home service needs. From plumbing to electrical work, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-200">
              Browse Services
            </Link>
            <Link to="/provider-register" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of professional home services to meet all your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-wrench text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Plumbing</h3>
              <p className="text-gray-600">Expert plumbing services for repairs and installations.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Electrical</h3>
              <p className="text-gray-600">Safe and reliable electrical work by certified professionals.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-200">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-paint-roller text-2xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Painting</h3>
              <p className="text-gray-600">Professional painting services for interior and exterior.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cleaning</h3>
              <p className="text-gray-600">Thorough cleaning services for your home or office.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting professional home services has never been easier.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Service</h3>
              <p className="text-gray-600">Browse our services and select what you need.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Professional</h3>
              <p className="text-gray-600">Connect with verified professionals in your area.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get It Done</h3>
              <p className="text-gray-600">Professional service delivered at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust HomeServi for their home service needs.
          </p>
          <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-200">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
