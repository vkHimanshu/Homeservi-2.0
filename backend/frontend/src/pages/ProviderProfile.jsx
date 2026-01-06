import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FaBuilding, FaEnvelope, FaPhone, FaSave, FaArrowLeft, FaBriefcase } from 'react-icons/fa';

const ProviderProfile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [provider, setProvider] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        services: [],
        experience: ''
    });

    const serviceCategories = ['plumbing', 'electrical', 'cleaning', 'carpentry', 'appliance-repair'];

    useEffect(() => {
        fetchProviderData();
    }, [user]);

    const fetchProviderData = async () => {
        try {
            const response = await api.get(`/providers/user/${user.id}`);
            setProvider(response.data);

            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                businessName: response.data.businessName || '',
                businessEmail: response.data.businessEmail || '',
                businessPhone: response.data.businessPhone || '',
                services: response.data.services || [],
                experience: response.data.experience || ''
            });
        } catch (error) {
            console.error('Error fetching provider data:', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleServiceToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Update user info
            const userResponse = await api.put(`/auth/user/${user.id}`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            });

            // Update provider info
            await api.put(`/providers/${provider._id}`, {
                businessName: formData.businessName,
                businessEmail: formData.businessEmail,
                businessPhone: formData.businessPhone,
                services: formData.services,
                experience: formData.experience
            });

            // Update local storage and context
            const updatedUser = userResponse.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success('Profile updated successfully!');
            navigate('/provider-dashboard');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                    <h1 className="text-2xl font-bold">Edit Provider Profile</h1>
                    <p className="opacity-90">Update your business information</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    <FaPhone className="inline mr-2" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    pattern="[0-9]{10}"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Business Information</h3>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    <FaBuilding className="inline mr-2" /> Business Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        <FaEnvelope className="inline mr-2" /> Business Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={formData.businessEmail}
                                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        <FaPhone className="inline mr-2" /> Business Phone
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={formData.businessPhone}
                                        onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    <FaBriefcase className="inline mr-2" /> Years of Experience
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    max="50"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Services Offered */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Services Offered</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {serviceCategories.map(service => (
                                <label
                                    key={service}
                                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${formData.services.includes(service)
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-green-300'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.services.includes(service)}
                                        onChange={() => handleServiceToggle(service)}
                                        className="mr-3 w-4 h-4 text-green-600"
                                    />
                                    <span className="capitalize font-medium">{service.replace('-', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <FaSave className="mr-2" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderProfile;
