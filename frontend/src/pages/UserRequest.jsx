import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRequestsByUserId, createRequest } from '../services/requestService';
import { 
  createAssistRequest, 
  getUserAssistRequests, 
  payAssistRequest, 
  submitFeedback 
} from '../services/assistRequestService';
import ProjectRequestForm from '../components/ProjectRequestForm';
import AssistRequestForm from '../components/AssistRequestForm';
import { Clock, Search, Check, Eye, FolderPlus, HelpCircle } from 'lucide-react';

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [assistRequests, setAssistRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAssistForm, setShowAssistForm] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRequests, assistRequestsData] = await Promise.all([
          getRequestsByUserId(user.id),
          getUserAssistRequests(user.id),
        ]);

        setRequests(projectRequests || []);
        setAssistRequests(assistRequestsData || []);
        setFilteredRequests(projectRequests || []);
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

  const handleRequestProject = async (formData) => {
    const { projectTitle, platform, purpose } = formData;
    if (!projectTitle.trim() || !platform || !purpose.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const requestData = { ...formData, clientId: user.id };
      await createRequest(requestData, token);
      window.location.reload();
      setShowRequestForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit project request');
    }
  };

  const handleRequestAssist = async (assistData) => {
    const { projectName, platform, sourceLink, technologies } = assistData;
    if (!projectName.trim() || !platform || !sourceLink.trim()) {
      setError('Project name, platform, and source link are required');
      return;
    }

    try {
      const savedRequest = await createAssistRequest({
        userId:user.id,
        projectName,
        projectType: platform,
        projectTechnologies: technologies,
      });
      setAssistRequests(prev => [...prev, savedRequest]);
      setShowAssistForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit assist request');
    }
  };

  const handlePayment = async (requestId, paymentType) => {
    try {
      const transactionId = `txn_${Date.now()}`; // Mock transaction ID, replace with real payment logic
      const updatedRequest = await payAssistRequest(requestId, paymentType, transactionId);
      setAssistRequests(prev =>
        prev.map(req => (req._id === requestId ? updatedRequest : req))
      );
      alert('Payment successful!');
    } catch (err) {
      setError(err.message || 'Payment failed');
    }
  };

  const handleFeedback = async (requestId, feedback, rating) => {
    try {
      const updatedRequest = await submitFeedback(requestId, feedback, rating);
      setAssistRequests(prev =>
        prev.map(req => (req._id === requestId ? updatedRequest : req))
      );
      alert('Feedback submitted!');
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    }
  };

  if (loading) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      Loading...
    </div>
  );
  if (error && !showRequestForm && !showAssistForm) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-red-400 bg-gray-900' : 'text-red-500 bg-white'}`}>
      {error}
    </div>
  );

  return (
    <div className={`container mx-auto p-5 w-full mt-16 ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div className="flex justify-between items-center mb-5">
        <h1 className="flex items-center gap-2 text-2xl">
          <Search className="w-5 h-5" />
          Your Requests
        </h1>
        <div className="flex flex-row gap-5 items-center">
          <button
            onClick={() => setShowRequestForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            <FolderPlus size={16} /> Request Project
          </button>
          <button
            onClick={() => setShowAssistForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500' : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-700'} border`}
          >
            <HelpCircle size={16} /> Request Assist
          </button>
        </div>
      </div>

      {/* Project Requests */}
      <div className="relative mb-5 max-w-xs">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search project requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        />
      </div>

      <div className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
              <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Project Title</th>
              <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Requested Date</th>
              <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Status</th>
              <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Project URL</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request._id} className={`border-b ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <td className="py-3 px-4">{request.projectTitle}</td>
                <td className="py-3 px-4">{formatDate(request.createdAt)}</td>
                <td className="py-3 px-4">
                  {request.requestStatus === 'Pending' ? (
                    <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
                      <Clock size={14} /> Pending
                    </span>
                  ) : (
                    <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
                      <Check size={14} /> Approved
                    </span>
                  )}
                </td>
                <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {request.requestStatus === 'Pending' ? (
                    <p className={theme === 'dark' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 cursor-not-allowed'}>
                      Once approved, the option will be available
                    </p>
                  ) : (
                    <button
                      onClick={() => handleViewProgress(request.projectStatusUrl)}
                      className={`flex items-center gap-1 px-3 py-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
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

      {/* Assist Requests */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Assist Requests</h2>
        <div className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Project Name</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Requested Date</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Request Status</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Assist Status</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistRequests.map(request => (
                <tr key={request._id} className={`border-b ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="py-3 px-4">{request.projectName}</td>
                  <td className="py-3 px-4">{formatDate(request.createdAt)}</td>
                  <td className="py-3 px-4">{request.requestStatus}</td>
                  <td className="py-3 px-4">{request.assistStatus}</td>
                  <td className="py-3 px-4">
                    {request.requestStatus === 'Approved' && !request.transactionId && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePayment(request._id, 'Google Pay')}
                          className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                          Google Pay (${request.amount})
                        </button>
                        <button
                          onClick={() => handlePayment(request._id, 'Razorpay')}
                          className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          Razorpay (${request.amount})
                        </button>
                      </div>
                    )}
                    {request.transactionId && request.assistStatus === 'Completed' && !request.feedback && (
                      <button
                        onClick={() => {
                          const feedback = prompt('Enter feedback:');
                          const rating = parseInt(prompt('Enter rating (1-5):'), 10);
                          if (feedback && rating) handleFeedback(request._id, feedback, rating);
                        }}
                        className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                      >
                        Submit Feedback
                      </button>
                    )}
                    {request.feedback && (
                      <span className="text-green-500">Feedback Submitted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRequestForm && (
        <ProjectRequestForm
          onClose={() => setShowRequestForm(false)}
          onSubmit={handleRequestProject}
          error={error}
          theme={theme}
        />
      )}

      {showAssistForm && (
        <AssistRequestForm
          onClose={() => setShowAssistForm(false)}
          onSubmit={handleRequestAssist}
          error={error}
          theme={theme}
        />
      )}
    </div>
  );
};

export default UserRequest;