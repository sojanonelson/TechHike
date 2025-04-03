import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAssignedProjects } from '../services/projectService'; // For projects
// import { getPendingPayments } from '../services/paymentService'; // Assumed service for payments

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch projects and payments concurrently
        const [projectData /*, paymentData*/] = await Promise.all([
          getAssignedProjects(user.id),
          // getPendingPayments(user.id), // Uncomment when service is available
        ]);
        setProjects(projectData || []);
        // setPendingPayments(paymentData || []); // Uncomment when service is available
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user.id]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      Loading...
    </div>
  );
  if (error) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-red-400 bg-gray-900' : 'text-red-500 bg-white'}`}>
      {error}
    </div>
  );

  return (
    <div className={` w-full  mx-auto mt-10 p-6 ${theme === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

      {/* Banner Section */}
      <div className={`p-6 rounded-lg mb-6 shadow-md ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
        <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
          Important Update
        </h2>
        <p className={theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}>
          We’re excited to announce new features coming soon! Stay tuned for updates on your projects and payments.
        </p>
      </div>

      {/* Projects Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No projects assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectClick(project._id)}
                className={`shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{project.projectTitle}</h3>
                <p className={theme === 'dark' ? 'text-gray-300 mb-3' : 'text-gray-600 mb-3'}>
                  {project.projectDescription}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'completed'
                      ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      : theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pending Payments Section (Commented Out) */}
      {/* <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
        {pendingPayments.length === 0 ? (
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No pending payments at this time.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pendingPayments.map((payment) => (
              <div
                key={payment._id}
                className={`shadow-md rounded-lg p-5 flex justify-between items-center ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold">{payment.projectTitle || 'Payment'}</h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Amount: ${payment.amount.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                  }`}
                >
                  Pending
                </span>
              </div>
            ))}
          </div>
        )}
      </section> */}
    </div>
  );
};

export default UserDashboard;