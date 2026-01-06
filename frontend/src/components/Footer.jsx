import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-4">HomeServi</h3>
                        <p className="text-gray-400 mb-4">
                            Your trusted platform for home services. Connect with verified professionals for all your home needs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="hover:text-blue-500 transition">
                                    Browse Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/register-provider" className="hover:text-blue-500 transition">
                                    Become a Provider
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-blue-500 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-500 transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services?category=plumbing" className="hover:text-blue-500 transition">
                                    Plumbing
                                </Link>
                            </li>
                            <li>
                                <Link to="/services?category=electrical" className="hover:text-blue-500 transition">
                                    Electrical
                                </Link>
                            </li>
                            <li>
                                <Link to="/services?category=cleaning" className="hover:text-blue-500 transition">
                                    Cleaning
                                </Link>
                            </li>
                            <li>
                                <Link to="/services?category=carpentry" className="hover:text-blue-500 transition">
                                    Carpentry
                                </Link>
                            </li>
                            <li>
                                <Link to="/services?category=appliance-repair" className="hover:text-blue-500 transition">
                                    Appliance Repair
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                                <span className="text-sm">123 Service Street, Uttar Pradesh, India</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="text-blue-500 mr-3" />
                                <span className="text-sm">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-blue-500 mr-3" />
                                <span className="text-sm">support@homeservi.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 HomeServi. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-gray-400 hover:text-blue-500 text-sm transition">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition">
                            Terms of Service
                        </Link>
                        <Link to="/faq" className="text-gray-400 hover:text-blue-500 text-sm transition">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
