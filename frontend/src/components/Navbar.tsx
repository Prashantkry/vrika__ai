import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '../style/media';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Use react-router's hook to get the current path

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path: string) => location.pathname === path; 

    return (
        <nav className="bg-black text-gray-200 shadow-lg font-bold border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/">
                        <img src={logo} alt="logo" className='w-[50px] h-[40px] rounded' />
                    </Link>

                    {/* Main Menu Links for larger screens */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className={`relative transition duration-300 ${isActive('/') ? 'text-indigo-500' : 'hover:text-indigo-400 group'}`}>
                            Home
                            {isActive('/') && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-500"></span>}
                        </Link>
                        <Link to="/ProductsPage" className={`relative transition duration-300 ${isActive('/ProductsPage') ? 'text-indigo-500' : 'hover:text-indigo-400 group'}`}>
                            Products
                            {isActive('/ProductsPage') && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-500"></span>}
                        </Link>
                        <Link to="/ServicePage" className={`relative transition duration-300 ${isActive('/ServicePage') ? 'text-indigo-500' : 'hover:text-indigo-400 group'}`}>
                            Services
                            {isActive('/ServicePage') && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-500"></span>}
                        </Link>
                        <Link to="/AboutPage" className={`relative transition duration-300 ${isActive('/AboutPage') ? 'text-indigo-500' : 'hover:text-indigo-400 group'}`}>
                            About
                            {isActive('/AboutPage') && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-500"></span>}
                        </Link>
                        <Link to="/ContactPage" className={`relative transition duration-300 ${isActive('/ContactPage') ? 'text-indigo-500' : 'hover:text-indigo-400 group'}`}>
                            Contact
                            {isActive('/ContactPage') && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-500"></span>}
                        </Link>
                    </div>

                    {/* Hamburger Menu Button for small screens */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none focus:outline-none" onClick={toggleMenu}>
                            <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="space-y-2 px-2 pt-2 pb-3 sm:px-3">
                        <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white ${isActive('/') ? 'bg-gray-800 text-white' : ''}`}>
                            Home
                        </Link>
                        <Link to="/ProductsPage" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white ${isActive('/ProductsPage') ? 'bg-gray-800 text-white' : ''}`}>
                            Products
                        </Link>
                        <Link to="/ServicePage" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white ${isActive('/ServicePage') ? 'bg-gray-800 text-white' : ''}`}>
                            Services
                        </Link>
                        <Link to="/AboutPage" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white ${isActive('/AboutPage') ? 'bg-gray-800 text-white' : ''}`}>
                            About
                        </Link>
                        <Link to="/ContactPage" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white ${isActive('/ContactPage') ? 'bg-gray-800 text-white' : ''}`}>
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
