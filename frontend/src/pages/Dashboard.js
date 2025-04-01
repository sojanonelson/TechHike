import { motion } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../pages/DashboardHome';
import Settings from './Settings';
import ProjectsPage from './Projects';
// import ProjectsPage from '../pages/ProjectsPage';
// import ClientsPage from '../pages/ClientsPage';
// import PaymentsPage from '../pages/PaymentsPage';
// import SettingsPage from '../pages/SettingsPage';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white text-white">
      {/* Sidebar Navigation */}
      <Sidebar navigate={navigate} />

      {/* Main Content Area */}
      <motion.main 
        className="flex-1 p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="projects" element={<ProjectsPage />} />
          {/* <Route path="clients" element={<ClientsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
        </Routes>
      </motion.main>
    </div>
  );
};

export default Dashboard;
