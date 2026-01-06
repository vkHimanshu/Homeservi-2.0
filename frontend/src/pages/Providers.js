import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [filters, setFilters] = useState({
    service: '',
    location: '',
    rating: ''
  });

  useEffect(() => {
    fetchProviders();
  }, [filters]);

  const fetchProviders = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.service) params.append('service', filters.service);
      if (filters.location) params.append('location', filters.location);
      if (filters.rating) params.append('rating', filters.rating);

      const response = await axios.get(`/api/providers?${params}`);
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const serviceOptions = [
    'Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Carpentry', 'HVAC'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Service Providers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified professionals in your area. Browse profiles, read reviews, and book services.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Providers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <select
              name="service"
              value={filters.service}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Services</option>
              {serviceOptions.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              className="input-field"
            />
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div key={provider._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={provider.profileImage || '/default-avatar.png'}
                    alt={provider.businessName}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{provider.businessName}</h3>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < Math.floor(provider.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                        ))}
                      </div>
                      <span className="text-gray-600">({provider.reviewCount || 0} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{provider.description || 'Professional service provider with years of experience.'}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.services?.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                    {provider.services?.length > 3 && (
                      <span className="text-gray-500 text-sm">+{provider.services.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {provider.location || 'Location not specified'}
                  </div>
                  <div className="text-sm text-gray-600">
                    <i className="fas fa-clock mr-1"></i>
                    {provider.experience || 'Experience not specified'}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProvider(provider)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                >
                  View Profile & Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {providers.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No providers found</h3>
            <p className="text-gray-500">Try adjusting your filters to find more providers.</p>
          </div>
        )}

        {/* Provider Profile Modal */}
        {selectedProvider && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{selectedProvider.businessName}</h3>
                  <button
                    onClick={() => setSelectedProvider(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProvider.profileImage || '/default-avatar.png'}
                      alt={selectedProvider.businessName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < Math.floor(selectedProvider.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                        ))}
                      </div>
                      <span className="text-gray-600">({selectedProvider.reviewCount || 0} reviews)</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><i className="fas fa-map-marker-alt mr-2"></i>{selectedProvider.location || 'Location not specified'}</p>
                      <p><i className="fas fa-clock mr-2"></i>{selectedProvider.experience || 'Experience not specified'}</p>
                      <p><i className="fas fa-phone mr-2"></i>{selectedProvider.businessPhone || 'Phone not specified'}</p>
                      <p><i className="fas fa-envelope mr-2"></i>{selectedProvider.businessEmail || 'Email not specified'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                    <p className="text-gray-600 mb-4">{selectedProvider.description || 'Professional service provider with years of experience.'}</p>

                    <h4 className="font-semibold text-gray-800 mb-2">Services Offered</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProvider.services?.map((service, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200">
                      Book Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;
