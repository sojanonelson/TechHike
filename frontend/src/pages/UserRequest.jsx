import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRequestsByUserId, createRequest } from '../services/requestService';
import { Clock, Search, Check, Eye, Plus } from 'lucide-react';

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequestData, setNewRequestData] = useState({
    clientId: '',
    projectTitle: '',
    projectDescription: '',
    platform: '',
    purpose: '',
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const requestsData = await getRequestsByUserId(user.id);
        setRequests(requestsData || []);
        setFilteredRequests(requestsData || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch requests');
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  useEffect(() => {
    const filtered = requests.filter(request =>
      (request.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleViewProgress = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequestData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestProject = async () => {
    const { projectTitle, projectDescription, platform, purpose } = newRequestData;
    if (!projectTitle.trim() || !projectDescription.trim() || !platform || !purpose.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const requestData = { ...newRequestData, clientId: user.id }; // Add clientId before sending
      const newRequest = await createRequest(requestData, token);
      window.location.reload()

      setShowRequestForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit project request');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  if (error && !showRequestForm) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-5 w-full mt-10 text-black">
      <div className="flex justify-between items-center mb-5">
        <h1 className="flex items-center gap-2 text-2xl">
          <Search className="w-5 h-5" />
          Your Requests
        </h1>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> Request Project
        </button>
      </div>

      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Request a New Project</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                name="projectTitle"
                value={newRequestData.projectTitle}
                onChange={handleInputChange}
                placeholder="Enter project title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <textarea
                name="projectDescription"
                value={newRequestData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your project"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                name="platform"
                value={newRequestData.platform}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a platform</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
                <option value="Web">Web</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Purpose</label>
              <textarea
                name="purpose"
                value={newRequestData.purpose}
                onChange={handleInputChange}
                placeholder="What do you need this project for?"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRequestForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Project Title</th>
              <th className="py-3 px-4 text-left">Requested Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Project URL</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request._id} className="hover:bg-gray-50 border-b">
                <td className="py-3 px-4">{request.projectTitle}</td>
                <td className="py-3 px-4">{formatDate(request.createdAt)}</td>
                <td className="py-3 px-4">
                  {request.requestStatus === 'Pending' ? (
                    <span className="flex items-center gap-1 text-orange-500">
                      <Clock size={14} /> Pending
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-500">
                      <Check size={14} /> Approved
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-blue-600">
                  {request.requestStatus === 'Pending' ? (
                    <p className="text-gray-500 cursor-not-allowed">
                      Once the request is approved, the option will be available
                    </p>
                  ) : (
                    <button
                      onClick={() => handleViewProgress(request.projectStatusUrl)}
                      className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={14} /> View Progress
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <Search size={24} />
          <p>{searchTerm ? 'No matching requests' : 'No requests found'}</p>
        </div>
      )}
    </div>
  );
};

export default UserRequest;