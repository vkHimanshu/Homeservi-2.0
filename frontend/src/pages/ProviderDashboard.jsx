import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaTools, FaCheck, FaTimes } from 'react-icons/fa';

const ProviderDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [providerProfile, setProviderProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First get the provider profile to get the provider ID
                const profileRes = await api.get(`/providers/user/${user.id}`);
                setProviderProfile(profileRes.data);

                // Then fetch bookings for this provider
                const bookingsRes = await api.get(`/bookings/provider/${profileRes.data._id}`);
                setBookings(bookingsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'provider') {
            fetchData();
        }
    }, [user]);

    const updateBookingStatus = async (bookingId, status) => {
        try {
            await api.put(`/bookings/${bookingId}/status`, { status });
            toast.success(`Booking ${status}`);

            // Refresh bookings
            setBookings(bookings.map(b =>
                b._id === bookingId ? { ...b, status } : b
            ));
        } catch (error) {
            console.error('Error updating booking:', error);
            toast.error('Failed to update booking');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'accepted': return 'bg-purple-100 text-purple-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const activeBookings = bookings.filter(b => ['accepted', 'in-progress'].includes(b.status));
    const pastBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-800">Provider Dashboard</h1>
                {providerProfile && (
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Business Name</p>
                            <p className="font-semibold">{providerProfile.businessName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Rating</p>
                            <p className="font-semibold">★ {providerProfile.rating} ({providerProfile.totalReviews} reviews)</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-semibold">{providerProfile.availability ? 'Available' : 'Unavailable'}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-yellow-50">
                    <h2 className="text-xl font-bold text-gray-800">Pending Requests ({pendingBookings.length})</h2>
                </div>

                {pendingBookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No pending requests</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {pendingBookings.map((booking) => (
                            <div key={booking._id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex flex-col lg:flex-row justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <FaTools className="text-xl" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-lg text-gray-800">{booking.service?.name}</h3>
                                            <div className="grid md:grid-cols-2 gap-2 mt-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <FaUser className="mr-2" />
                                                    {booking.customer?.firstName} {booking.customer?.lastName}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaCalendar className="mr-2" />
                                                    {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                                                </div>
                                                <div className="flex items-center text-gray-600 md:col-span-2">
                                                    <FaMapMarkerAlt className="mr-2" />
                                                    {booking.address.street}, {booking.address.city}
                                                </div>
                                            </div>
                                            {booking.notes && (
                                                <p className="mt-2 text-sm text-gray-500 italic">Note: {booking.notes}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end gap-2">
                                        <div className="font-bold text-xl text-gray-800">₹{booking.totalAmount}</div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateBookingStatus(booking._id, 'accepted')}
                                                className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                            >
                                                <FaCheck /> Accept
                                            </button>
                                            <button
                                                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                                className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                <FaTimes /> Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Active Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-blue-50">
                    <h2 className="text-xl font-bold text-gray-800">Active Bookings ({activeBookings.length})</h2>
                </div>

                {activeBookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No active bookings</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {activeBookings.map((booking) => (
                            <div key={booking._id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex flex-col lg:flex-row justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <FaTools className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{booking.service?.name}</h3>
                                            <div className="grid md:grid-cols-2 gap-2 mt-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <FaUser className="mr-2" />
                                                    {booking.customer?.firstName} {booking.customer?.lastName}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaCalendar className="mr-2" />
                                                    {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                        <div className="font-bold text-lg text-gray-800">₹{booking.totalAmount}</div>
                                        {booking.status === 'accepted' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking._id, 'in-progress')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                            >
                                                Start Job
                                            </button>
                                        )}
                                        {booking.status === 'in-progress' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking._id, 'completed')}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Past Bookings ({pastBookings.length})</h2>
                </div>

                {pastBookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No past bookings</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {pastBookings.slice(0, 5).map((booking) => (
                            <div key={booking._id} className="p-6 hover:bg-gray-50 transition opacity-75">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{booking.service?.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(booking.bookingDate).toLocaleDateString()} - {booking.customer?.firstName} {booking.customer?.lastName}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                        <p className="font-bold text-gray-800 mt-1">₹{booking.totalAmount}</p>
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

export default ProviderDashboard;
