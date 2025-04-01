// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice'; // Ensure path matches your structure
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Get user from Redux

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Logged-in user name from Redux in Navbar:', user.name);
    } else {
      console.log('No user logged in (Navbar)');
    }
  }, [user]); // Console log when user changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    setIsOpen(false); // Close mobile menu on logout
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Dashboard' },
    // Conditionally show Login or user name + Logout
    ...(user
      ? [
          {
            path: '#', // No path needed for logout, handled by button
            label: `Welcome, ${user.name}`,
            isLogout: true, // Custom flag to identify logout item
          },
        ]
      : [{ path: '/login', label: 'Login' }]),
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-lg' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex group relative">
              <img src={Logo} alt="logo" className="w-10" />
              <h1 className="text-2xl font-bold text-black transition-colors duration-300 group-hover:text-blue-600">
                Tech Hike
              </h1>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isLogout ? (
                <div key="logout" className="flex items-center space-x-4">
                  <span className="text-gray-700">{item.label}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 transition-all duration-300
                    ${
                      location.pathname === item.path
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }
                    before:content-[''] before:absolute before:bottom-0 before:left-0 
                    before:w-0 before:h-0.5 before:bg-blue-600 
                    before:transition-all before:duration-300
                    hover:before:w-full
                  `}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
          {navItems.map((item) =>
            item.isLogout ? (
              <div key="logout" className="flex justify-between items-center px-3 py-2">
                <span className="text-gray-700">{item.label}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md transition-colors duration-300
                  ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;