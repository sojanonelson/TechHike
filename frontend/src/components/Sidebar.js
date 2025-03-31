import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Settings, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
    { name: 'Projects', icon: <FileText className="w-5 h-5" />, path: '/projects' },
    { name: 'Clients', icon: <Users className="w-5 h-5" />, path: '/clients' },
    { name: 'Payments', icon: <Wallet className="w-5 h-5" />, path: '/payments' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
  ];

  return (
    <motion.aside 
      className="w-64 bg-white shadow-sm hidden md:block"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="p-4 h-full flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 px-4">CollabDash</h1>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              YU
            </div>
            <div className="ml-3">
              <p className="font-medium">Your Username</p>
              <p className="text-sm text-gray-500">Team Member</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;