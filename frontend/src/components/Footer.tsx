import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-200 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Vrika AI</h2>
                        <p className="text-gray-400">
                            At Vrika AI, we harness the power of artificial intelligence to transform businesses with innovative solutions that accelerate growth and efficiency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-indigo-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/AboutPage" className="hover:text-indigo-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/ServicePage" className="hover:text-indigo-400">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/ContactPage" className="hover:text-indigo-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-gray-400">Email:</span>
                                <a href="mailto:contact@vrikaai.com" className="hover:text-indigo-400">
                                    contact@vrikaai.com
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-400">Phone:</span>
                                <a href="tel:+123456789" className="hover:text-indigo-400">
                                    +91 7991132070
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-400">Address:</span>
                                <p className="text-gray-400">803212, BKP, Patna Bihar</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-800 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Vrika AI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
