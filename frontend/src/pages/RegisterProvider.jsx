import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../api/axios';

const RegisterProvider = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        services: [],
        experience: 0,
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const serviceCategories = ['plumbing', 'electrical', 'cleaning', 'carpentry', 'appliance-repair'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (formData.services.length === 0) {
            return toast.error('Please select at least one service');
        }

        try {
            const { confirmPassword, ...dataToSubmit } = formData;
            const response = await api.post('/auth/register-provider', dataToSubmit);

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Provider registered successfully');
            navigate('/provider-dashboard');
            window.location.reload(); // Reload to update auth context
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceToggle = (service) => {
        setFormData({
            ...formData,
            services: formData.services.includes(service)
                ? formData.services.filter(s => s !== service)
                : [...formData.services, service]
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register as Provider</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.businessName}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Business Email</label>
                        <input
                            type="email"
                            name="businessEmail"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.businessEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Business Phone</label>
                        <input
                            type="tel"
                            name="businessPhone"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.businessPhone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Years of Experience</label>
                    <input
                        type="number"
                        name="experience"
                        required
                        min="0"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Services Offered</label>
                    <div className="grid grid-cols-2 gap-3">
                        {serviceCategories.map(service => (
                            <label key={service} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.services.includes(service)}
                                    onChange={() => handleServiceToggle(service)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="capitalize">{service.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Register as Provider
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterProvider;
