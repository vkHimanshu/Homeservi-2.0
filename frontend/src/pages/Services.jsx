import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    const [searchTerm, setSearchTerm] = useState(searchQuery || '');

    useEffect(() => {
        fetchServices();
    }, [categoryFilter]);

    useEffect(() => {
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [searchQuery]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            let url = '/services';
            if (categoryFilter) {
                url = `/services/category/${categoryFilter}`;
            }
            const response = await api.get(url);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Appliance-Repair'];

    return (
        <div className="space-y-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <h1 className="text-3xl font-bold text-gray-800">
                    {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Services` : 'All Services'}
                </h1>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <select
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={categoryFilter || ''}
                        onChange={(e) => setSearchParams(e.target.value ? { category: e.target.value } : {})}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Service Grid */}
            {loading ? (
                <div className="text-center py-20">Loading services...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div key={service._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-48 bg-gray-200 relative">
                                {service.image ? (
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                        No Image
                                    </div>
                                )}
                                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-sm">
                                    ₹{service.price}
                                </span>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{service.description}</p>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">{service.duration} mins</span>
                                    <Link
                                        to={`/services/${service._id}`}
                                        className="text-blue-600 font-semibold hover:text-blue-700"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredServices.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No services found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default Services;
