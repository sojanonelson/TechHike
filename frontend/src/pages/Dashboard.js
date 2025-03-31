import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Settings, Wallet } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import EarningsChart from '../components/EarningsChart';
import ProjectsTable from '../components/ProjectsTable';
import ActivityFeed from '../components/ActivityFeed';

const Dashboard = () => {
  // Sample data - replace with your actual data
  const stats = {
    totalProjects: 24,
    completedProjects: 18,
    pendingPayments: 2,
    totalEarnings: 12500,
    myEarnings: 7500,
    partnerEarnings: 5000
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <motion.main 
        className="flex-1 p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Projects" 
            value={stats.totalProjects} 
            icon={<FileText className="w-6 h-6" />}
            color="bg-blue-100 text-blue-600"
          />
          <DashboardCard 
            title="Completed Projects" 
            value={stats.completedProjects} 
            icon={<FileText className="w-6 h-6" />}
            color="bg-green-100 text-green-600"
          />
          <DashboardCard 
            title="Pending Payments" 
            value={stats.pendingPayments} 
            icon={<Wallet className="w-6 h-6" />}
            color="bg-yellow-100 text-yellow-600"
          />
          <DashboardCard 
            title="Total Earnings" 
            value={`₹${stats.totalEarnings}`} 
            icon={<Wallet className="w-6 h-6" />}
            color="bg-purple-100 text-purple-600"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Earnings Breakdown</h2>
            <EarningsChart 
              myEarnings={stats.myEarnings}
              partnerEarnings={stats.partnerEarnings}
              jointEarnings={stats.totalEarnings - (stats.myEarnings + stats.partnerEarnings)}
            />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ActivityFeed />
          </motion.div>
        </div>
        
        {/* Projects Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <ProjectsTable />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Dashboard;