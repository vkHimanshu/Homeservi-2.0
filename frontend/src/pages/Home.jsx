import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaTools, FaBroom, FaHammer, FaBolt } from 'react-icons/fa';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const categories = [
        { name: 'Plumbing', icon: <FaTools />, color: 'bg-blue-100 text-blue-600' },
        { name: 'Cleaning', icon: <FaBroom />, color: 'bg-green-100 text-green-600' },
        { name: 'Carpentry', icon: <FaHammer />, color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Electrical', icon: <FaBolt />, color: 'bg-red-100 text-red-600' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to services page with search query
            navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/services');
        }
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl text-white shadow-xl">
                <h1 className="text-5xl font-bold mb-6">Find Trusted Professionals for Your Home</h1>
                <p className="text-xl mb-8 opacity-90">Book reliable home services instantly.</p>
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="What service do you need? (e.g., plumbing, cleaning)"
                        className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
                    >
                        <FaSearch className="text-white" />
                    </button>
                </form>
            </section>

            {/* Categories */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Popular Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/services?category=${cat.name.toLowerCase()}`}
                            className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100"
                        >
                            <div className={`p-4 rounded-full mb-4 ${cat.color} text-3xl`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-gray-700">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Services */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Choose HomeServi?</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Verified Professionals</h3>
                        <p className="text-gray-600">All our providers are background checked and verified.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
                        <p className="text-gray-600">Pay safely through our secure platform.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Satisfaction Guaranteed</h3>
                        <p className="text-gray-600">If you're not happy, we'll make it right.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
