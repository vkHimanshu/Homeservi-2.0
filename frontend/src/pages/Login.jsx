import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaUserShield, FaTools } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user');
    const { login } = useAuth();
    const navigate = useNavigate();

    const roles = [
        {
            id: 'user',
            label: 'User',
            icon: FaUser,
            color: 'bg-blue-500 hover:bg-blue-600',
            description: 'Book services'
        },
        {
            id: 'provider',
            label: 'Service Provider',
            icon: FaTools,
            color: 'bg-green-500 hover:bg-green-600',
            description: 'Manage bookings'
        },
        {
            id: 'admin',
            label: 'Admin',
            icon: FaUserShield,
            color: 'bg-purple-500 hover:bg-purple-600',
            description: 'Platform management'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);

        if (result.success) {
            // Get the actual user role from the response
            const userRole = JSON.parse(localStorage.getItem('user')).role;

            // Validate that the user's role matches the selected role
            if (userRole !== selectedRole) {
                // Logout and show error
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                toast.error(`This account is registered as ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}, not ${roles.find(r => r.id === selectedRole)?.label}. Please select the correct role.`);
                return;
            }

            toast.success('Login successful!');
            // Redirect based on user role
            if (userRole === 'admin') {
                navigate('/admin');
            } else if (userRole === 'provider') {
                navigate('/provider-dashboard');
            } else {
                navigate('/dashboard');
            }
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-8">Login to continue</p>

                {/* Role Selection */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">I am a:</p>
                    <div className="grid grid-cols-3 gap-3">
                        {roles.map((role) => {
                            const IconComponent = role.icon;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedRole === role.id
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <IconComponent className={`text-2xl mx-auto mb-2 ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                    <p className={`text-xs font-semibold ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-600'
                                        }`}>
                                        {role.label}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <div className="text-right mt-2">
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md"
                    >
                        Login as {roles.find(r => r.id === selectedRole)?.label}
                    </button>
                </form>

                {/* Quick Access Credentials */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Quick Access:</p>
                    <div className="space-y-1 text-xs text-gray-500">
                        {selectedRole === 'admin' && (
                            <p>👑 Admin: admin@homeservi.com / admin123</p>
                        )}
                        {selectedRole === 'provider' && (
                            <p>🔧 Register as Provider to get credentials</p>
                        )}
                        {selectedRole === 'user' && (
                            <p>👤 Register to create your account</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        {selectedRole === 'provider' ? (
                            <Link to="/register-provider" className="text-blue-600 hover:underline font-semibold">
                                Register as Provider
                            </Link>
                        ) : (
                            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                                Register
                            </Link>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
