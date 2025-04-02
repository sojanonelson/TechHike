import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Settings, Inbox, Wallet } from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = ({ navigate }) => {
  const { user } = useSelector((state) => state.user);

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

  return (
    <motion.aside 
      className="w-64 bg-gray-800 shadow-sm hidden md:block"
      initial={{ x: -10 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 40 }}
    >
      <div className="p-4 flex flex-col mt-16">
        <h1 className="text-2xl font-bold text-white mb-8 px-4">Dashboard</h1>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer"
              >
                <div 
                  onClick={() => navigate(`/dashboard/${item.path}`)} 
                  className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-700"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;