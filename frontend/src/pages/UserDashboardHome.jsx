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

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch projects and payments concurrently
        const [projectData, paymentData] = await Promise.all([
          getAssignedProjects(user.id),
        //   getPendingPayments(user.id), // Assumed API call
        ]);
        setProjects(projectData);
        setPendingPayments(paymentData);
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

  if (loading) return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10 p-6 text-black">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

      {/* Banner Section */}
      <div className="bg-blue-100 p-6 rounded-lg mb-6 shadow-md">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Important Update</h2>
        <p className="text-blue-700">
          We’re excited to announce new features coming soon! Stay tuned for updates on your projects and payments.
        </p>
      </div>

      {/* Projects Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectClick(project._id)}
                className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold mb-2">{project.projectTitle}</h3>
                <p className="text-gray-600 mb-3">{project.projectDescription}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pending Payments Section */}
      {/* <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
        {pendingPayments.length === 0 ? (
          <p className="text-gray-500">No pending payments at this time.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pendingPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{payment.projectTitle || 'Payment'}</h3>
                  <p className="text-gray-600">Amount: ${payment.amount.toFixed(2)}</p>
                </div>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
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