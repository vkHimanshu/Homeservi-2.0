import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Booking = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);

    const [formData, setFormData] = useState({
        provider: '',
        bookingDate: '',
        bookingTime: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        },
        notes: ''
    });

    useEffect(() => {
        // Redirect providers and admins away from booking page
        if (user && (user.role === 'provider' || user.role === 'admin')) {
            toast.error(`${user.role === 'provider' ? 'Providers' : 'Admins'} cannot book services. Please use a customer account.`);
            navigate('/services');
            return;
        }

        const fetchData = async () => {
            try {
                const serviceRes = await api.get(`/services/${serviceId}`);
                setService(serviceRes.data);

                // Fetch providers who offer this service
                const providersRes = await api.get(`/providers?service=${serviceRes.data.category}`);
                setProviders(providersRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [serviceId, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.provider) {
            return toast.error('Please select a provider');
        }

        try {
            const bookingData = {
                customer: user.id,
                provider: formData.provider,
                service: serviceId,
                bookingDate: formData.bookingDate,
                bookingTime: formData.bookingTime,
                address: formData.address,
                totalAmount: service.price,
                notes: formData.notes
            };

            await api.post('/bookings', bookingData);
            toast.success('Booking created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Booking failed:', error);
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!service) return <div className="text-center py-20">Service not found</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
                <h1 className="text-2xl font-bold">Book Service</h1>
                <p className="opacity-90">Complete your booking for {service.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Service Summary */}
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-800">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.duration} mins</p>
                    </div>
                    <div className="text-xl font-bold text-blue-600">₹{service.price}</div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaCalendarAlt className="inline mr-2" /> Date
                        </label>
                        <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.bookingDate}
                            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaClock className="inline mr-2" /> Time
                        </label>
                        <input
                            type="time"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.bookingTime}
                            onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                        />
                    </div>
                </div>

                {/* Provider Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Select Provider</label>
                    <div className="grid gap-4 md:grid-cols-2">
                        {providers.map(provider => (
                            <div
                                key={provider._id}
                                onClick={() => setFormData({ ...formData, provider: provider._id })}
                                className={`p-4 border rounded-lg cursor-pointer transition ${formData.provider === provider._id
                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                <div className="font-bold text-gray-800">{provider.businessName}</div>
                                <div className="text-sm text-gray-500">
                                    {provider.user.firstName} {provider.user.lastName}
                                </div>
                                <div className="text-xs text-yellow-600 mt-1">
                                    ★ {provider.rating} ({provider.totalReviews} reviews)
                                </div>
                            </div>
                        ))}
                        {providers.length === 0 && (
                            <div className="col-span-2 text-center text-gray-500 py-4 bg-gray-50 rounded-lg">
                                No providers available for this service currently.
                            </div>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 font-medium mb-4">
                        <FaMapMarkerAlt className="inline mr-2" /> Service Location
                    </label>
                    <div className="grid gap-4">
                        <input
                            type="text"
                            placeholder="Street Address"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.address.street}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, street: e.target.value }
                            })}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.address.city}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    address: { ...formData.address, city: e.target.value }
                                })}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.address.state}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    address: { ...formData.address, state: e.target.value }
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Zip Code"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.address.zipCode}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    address: { ...formData.address, zipCode: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
                    <textarea
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-bold text-lg shadow-lg"
                >
                    Confirm Booking (₹{service.price})
                </button>
            </form>
        </div>
    );
};

export default Booking;
