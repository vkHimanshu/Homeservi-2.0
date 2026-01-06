import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaClock, FaTag, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const ServiceDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await api.get(`/services/${id}`);
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!service) return <div className="text-center py-20">Service not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
            >
                <FaArrowLeft className="mr-2" /> Back to Services
            </button>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="h-64 md:h-80 bg-gray-200 relative">
                    {service.image ? (
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-xl">
                            No Image Available
                        </div>
                    )}
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-2">
                                {service.category}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-800">{service.name}</h1>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <div className="text-3xl font-bold text-blue-600">₹{service.price}</div>
                            <div className="text-gray-500 text-sm">per service</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <FaClock className="mr-3 text-blue-500 text-xl" />
                            <div>
                                <div className="text-sm text-gray-500">Duration</div>
                                <div className="font-semibold">{service.duration} minutes</div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <FaTag className="mr-3 text-green-500 text-xl" />
                            <div>
                                <div className="text-sm text-gray-500">Category</div>
                                <div className="font-semibold capitalize">{service.category}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <FaCheckCircle className="mr-3 text-purple-500 text-xl" />
                            <div>
                                <div className="text-sm text-gray-500">Guarantee</div>
                                <div className="font-semibold">100% Satisfaction</div>
                            </div>
                        </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {service.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-8 flex justify-end">
                        {user && user.role === 'user' ? (
                            <Link
                                to={`/book/${service._id}`}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Book This Service
                            </Link>
                        ) : user && (user.role === 'provider' || user.role === 'admin') ? (
                            <div className="text-gray-500 text-center py-4">
                                <p className="font-medium">
                                    {user.role === 'provider' ? 'Providers cannot book services' : 'Admins cannot book services'}
                                </p>
                                <p className="text-sm mt-1">Please use a customer account to book services</p>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg"
                            >
                                Login to Book
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
