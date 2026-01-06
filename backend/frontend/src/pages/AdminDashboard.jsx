import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'plumbing',
        description: '',
        price: '',
        duration: '',
        image: ''
    });

    const categories = ['plumbing', 'electrical', 'cleaning', 'carpentry', 'appliance-repair'];

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('Access denied. Admin only.');
            navigate('/');
            return;
        }
        fetchServices();
    }, [user, navigate]);

    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await api.put(`/services/${editingService._id}`, formData);
                toast.success('Service updated successfully');
            } else {
                await api.post('/services', formData);
                toast.success('Service created successfully');
            }
            setShowForm(false);
            setEditingService(null);
            setFormData({
                name: '',
                category: 'plumbing',
                description: '',
                price: '',
                duration: '',
                image: ''
            });
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            toast.error(error.response?.data?.message || 'Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            category: service.category,
            description: service.description,
            price: service.price,
            duration: service.duration,
            image: service.image || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (serviceId) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            await api.delete(`/services/${serviceId}`);
            toast.success('Service deleted successfully');
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Failed to delete service');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingService(null);
        setFormData({
            name: '',
            category: 'plumbing',
            description: '',
            price: '',
            duration: '',
            image: ''
        });
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage services and platform settings</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        <FaPlus /> Add New Service
                    </button>
                )}
            </div>

            {/* Service Form */}
            {showForm && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        {editingService ? 'Edit Service' : 'Create New Service'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Service Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Category</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
                                <input
                                    type="number"
                                    required
                                    min="30"
                                    step="15"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image URL (optional)</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                <FaCheck /> {editingService ? 'Update Service' : 'Create Service'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                            >
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Services List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">All Services ({services.length})</h2>
                </div>

                {services.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No services created yet. Click "Add New Service" to get started.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <div key={service._id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold capitalize">
                                                {service.category.replace('-', ' ')}
                                            </span>
                                            {service.isActive ? (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-2">{service.description}</p>
                                        <div className="flex gap-6 text-sm text-gray-500">
                                            <span>💰 ₹{service.price}</span>
                                            <span>⏱️ {service.duration} mins</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <FaTrash className="text-xl" />
                                        </button>
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

export default AdminDashboard;
