import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (user.role === 'admin') return '/admin';
        if (user.role === 'provider') return '/provider-dashboard';
        return '/dashboard';
    };

    const getDashboardLabel = () => {
        if (user.role === 'admin') return 'Admin Panel';
        return 'My Dashboard';
    };

    const getProfileLink = () => {
        if (user.role === 'provider') return '/provider-profile';
        return '/profile';
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            HomeServi
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-8">
                            <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                Services
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={getDashboardLink()}
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    {getDashboardLabel()}
                                </Link>
                                {user.role !== 'admin' && (
                                    <Link
                                        to={getProfileLink()}
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Edit Profile
                                    </Link>
                                )}
                                <span className="text-gray-700">Hello, {user.firstName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-gray-700 hover:text-red-600"
                                >
                                    <FaSignOutAlt className="mr-1" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Register
                                </Link>
                                <Link to="/register-provider" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                                    Become a Provider
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
