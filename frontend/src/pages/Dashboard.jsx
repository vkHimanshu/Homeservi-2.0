import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaTools } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect providers to their dashboard
        if (user && user.role === 'provider') {
            navigate('/provider-dashboard');
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await api.get(`/bookings/user/${user.id}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user, navigate]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">My Bookings</h2>
                </div>

                {bookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        You haven't made any bookings yet.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <FaTools className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{booking.service?.name}</h3>
                                            <div className="flex items-center text-gray-500 mt-1">
                                                <FaUser className="mr-2 text-xs" />
                                                <span className="text-sm">Provider: {booking.provider?.businessName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-500 mt-1">
                                                <FaMapMarkerAlt className="mr-2 text-xs" />
                                                <span className="text-sm">
                                                    {booking.address.street}, {booking.address.city}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                        <div className="flex items-center text-gray-600">
                                            <FaCalendar className="mr-2 text-sm" />
                                            <span className="font-medium">
                                                {new Date(booking.bookingDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaClock className="mr-2 text-sm" />
                                            <span className="font-medium">{booking.bookingTime}</span>
                                        </div>
                                        <div className="font-bold text-lg text-gray-800 mt-1">
                                            ₹{booking.totalAmount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
