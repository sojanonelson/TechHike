import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../pages/DashboardHome";
import Settings from "./Settings";
import RequestManagement from "./RequestManagement";
import ProjectManagement from "./ProjectManagement";
import ProjectDetail from "./ProjectDetail";
import Clients from "./Clients";
import UserProject from "./UserProject";
import UserDashboard from "./UserDashboardHome";
import UserRequest from "./UserRequest";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role) {
      setUserRole(user.role);
    } else {
      navigate("/"); // Redirect if no valid user role
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-white text-white">
      {/* Sidebar Navigation */}
      <Sidebar navigate={navigate} />

      {/* Main Content Area */}
      <motion.main
        className="flex-1 p-2 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          {/* <Route path="/" element={<DashboardHome />} /> */}
          <Route path="/" element={userRole === "admin" ? <DashboardHome /> : <UserDashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="projects" element={userRole === "admin" ? <ProjectManagement /> : <UserProject />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="request" element={userRole === "admin" ? <RequestManagement /> : <UserRequest />} />
          <Route path="clients" element={<Clients />} />
        </Routes>
      </motion.main>
    </div>
  );
};

export default Dashboard;
