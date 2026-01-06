import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const serviceCategories = [
    {
      name: 'Plumbing',
      icon: 'fas fa-wrench',
      description: 'Expert plumbing services for repairs and installations',
      services: ['Pipe Repair', 'Leak Detection', 'Water Heater Installation', 'Drain Cleaning']
    },
    {
      name: 'Electrical',
      icon: 'fas fa-bolt',
      description: 'Safe and reliable electrical work by certified professionals',
      services: ['Wiring', 'Outlet Installation', 'Circuit Breaker Repair', 'Lighting Installation']
    },
    {
      name: 'Painting',
      icon: 'fas fa-paint-roller',
      description: 'Professional painting services for interior and exterior',
      services: ['Interior Painting', 'Exterior Painting', 'Wall Texturing', 'Color Consultation']
    },
    {
      name: 'Cleaning',
      icon: 'fas fa-home',
      description: 'Thorough cleaning services for your home or office',
      services: ['Deep Cleaning', 'Regular Cleaning', 'Carpet Cleaning', 'Window Cleaning']
    },
    {
      name: 'Carpentry',
      icon: 'fas fa-hammer',
      description: 'Skilled carpentry work for all your woodworking needs',
      services: ['Furniture Assembly', 'Door Installation', 'Shelf Installation', 'Deck Building']
    },
    {
      name: 'HVAC',
      icon: 'fas fa-wind',
      description: 'Heating, ventilation, and air conditioning services',
      services: ['AC Repair', 'Heating System Maintenance', 'Duct Cleaning', 'Thermostat Installation']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional home services delivered by verified experts. Choose from our comprehensive range of services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <i className={`${category.icon} text-2xl text-blue-600`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.services.map((service, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {service}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedService(category)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Booking Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Book {selectedService.name} Service</h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <p className="text-gray-600 mb-4">Fill out the form below to book this service.</p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input-field"
                  required
                />
                <textarea
                  placeholder="Service Description"
                  rows="3"
                  className="input-field"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                >
                  Submit Booking Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
