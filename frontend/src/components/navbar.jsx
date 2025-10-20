import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/cashifylogo.png';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-[#3A506B] shadow-md border-b border rounded-2xl border-gray-100 z-50">
            <div className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                <div className="flex justify-between items-center h-12 sm:h-14">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                className="h-12 w-auto sm:h-14 md:h-16" 
                                src={logo} 
                                alt="Cashify Logo"
                            />
                        </Link>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-6 flex items-center space-x-3">
                            <Link 
                                to="/" 
                                className="text-white transform hover:scale-125 px-2 py-1 rounded text-lg font-bold transition-colors duration-200"
                            >Home</Link>
                            <Link 
                                to="/login" 
                                className="text-white transform hover:scale-125 px-2 py-1 rounded text-lg font-bold transition-colors duration-200"
                            >Login</Link>
                            <Link 
                                to="/dashboard" 
                                className="text-white transform hover:scale-125 px-3 py-1 rounded text-lg font-bold transition-colors duration-200"
                            >Dashboard</Link>
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu content */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        <Link 
                            to="/" 
                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/login" 
                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/dashboard" 
                            className="block px-3 py-2 text-base font-medium  text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                       
                    </div>
                </div>
            )}
        </nav>
    );

};
export default Navbar;  