import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FaLock, FaKey, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: location.state?.email || '',
        resetToken: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (formData.newPassword.length < 6) {
            return toast.error('Password must be at least 6 characters long');
        }

        setLoading(true);

        try {
            await api.post('/auth/reset-password', {
                email: formData.email,
                resetToken: formData.resetToken,
                newPassword: formData.newPassword
            });

            toast.success('Password reset successful! Please login with your new password.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <Link to="/forgot-password" className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
                    <FaArrowLeft className="mr-2" /> Back
                </Link>

                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Reset Password</h2>
                <p className="text-gray-500 text-center mb-8">
                    Enter your reset code and new password
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaEnvelope className="inline mr-2" /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaKey className="inline mr-2" /> Reset Code
                        </label>
                        <input
                            type="text"
                            required
                            pattern="[0-9]{6}"
                            maxLength="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg tracking-wider"
                            value={formData.resetToken}
                            onChange={(e) => setFormData({ ...formData, resetToken: e.target.value })}
                            placeholder="Enter 6-digit code"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter the 6-digit code from the previous page
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaLock className="inline mr-2" /> New Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            placeholder="Enter new password (min 6 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaLock className="inline mr-2" /> Confirm New Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have a reset code?{' '}
                        <Link to="/forgot-password" className="text-blue-600 hover:underline font-semibold">
                            Get Reset Code
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
