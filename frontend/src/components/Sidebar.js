import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Settings, Inbox, Moon, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Sidebar = ({ navigate }) => {
  const { user } = useSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Define navItems array
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '' },
    { name: 'Projects', icon: <FileText className="w-5 h-5" />, path: 'projects' },
    { name: 'Request', icon: <Inbox className="w-5 h-5" />, path: 'request' },
    { name: 'Clients', icon: <Users className="w-5 h-5" />, path: 'clients' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },
  ];

  // Filter navItems to exclude 'Clients' if user.role is 'client'
  const filteredNavItems = navItems.filter(item => 
    user.role === 'client' ? item.name !== 'Clients' : true
  );

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.aside 
      className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm hidden md:block transition-colors duration-300`}
      initial={{ x: -10 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 40 }}
    >
      <div className="p-4 flex flex-col mt-16">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-8 px-4`}>Dashboard</h1>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer"
              >
                <div 
                  onClick={() => navigate(`/dashboard/${item.path}`)} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Theme toggle button */}
        <div className="mt-8 px-4">
          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <span className="flex items-center">
              {darkMode ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
        
        {/* User info section */}
        <div className={`mt-8 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center px-4 py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium">{user.name || 'User'}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.role || 'Role'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;