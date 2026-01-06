import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [showToken, setShowToken] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setResetToken(response.data.resetToken);
            setShowToken(true);
            toast.success('Reset code generated! Copy the code below.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to generate reset code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <Link to="/login" className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
                    <FaArrowLeft className="mr-2" /> Back to Login
                </Link>

                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Forgot Password?</h2>
                <p className="text-gray-500 text-center mb-8">
                    Enter your email to receive a password reset code
                </p>

                {!showToken ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                <FaEnvelope className="inline mr-2" /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? 'Generating Code...' : 'Get Reset Code'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <p className="text-green-800 font-medium mb-2">✅ Reset Code Generated!</p>
                            <p className="text-sm text-green-700 mb-4">
                                Copy this code and use it on the reset password page:
                            </p>
                            <div className="bg-white border-2 border-green-500 rounded-lg p-4 text-center">
                                <p className="text-3xl font-mono font-bold text-green-600 tracking-wider">
                                    {resetToken}
                                </p>
                            </div>
                            <p className="text-xs text-green-600 mt-2">
                                ⏱️ This code expires in 1 hour
                            </p>
                        </div>

                        <Link
                            to="/reset-password"
                            state={{ email }}
                            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
                        >
                            Proceed to Reset Password
                        </Link>

                        <button
                            onClick={() => {
                                setShowToken(false);
                                setResetToken('');
                                setEmail('');
                            }}
                            className="w-full text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Request New Code
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Remember your password?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
