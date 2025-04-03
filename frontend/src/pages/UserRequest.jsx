import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRequestsByUserId, createRequest } from '../services/requestService';
import { Clock, Search, Check, Eye, FolderPlus, HelpCircle } from 'lucide-react';

// New Assist Request Form Component
const AssistRequestForm = ({ onClose, onSubmit, error }) => {
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux
  const [assistData, setAssistData] = useState({
    projectName: '',
    platform: '',
    sourceLink: '',
    technologies: [],
  });
  const [techSearch, setTechSearch] = useState('');
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);

  const technologiesList = [
    'ReactJS', 'NextJS', 'Vite', 'JavaScript', 'TypeScript', 'Python', 'Node.js',
    'Socket.IO', 'MongoDB', 'Firebase', 'AWS', 'Django', 'Flask', 'Express.js',
    'Vue.js', 'Angular', 'Svelte', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL',
    'Docker', 'Kubernetes', 'GCP', 'Azure'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssistData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechSearch = (e) => {
    setTechSearch(e.target.value);
    setIsTechDropdownOpen(true);
  };

  const handleTechSelect = (tech) => {
    if (!assistData.technologies.includes(tech)) {
      setAssistData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
    }
    setTechSearch('');
    setIsTechDropdownOpen(false);
  };

  const handleTechRemove = (tech) => {
    setAssistData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const filteredTechnologies = technologiesList.filter(tech =>
    tech.toLowerCase().includes(techSearch.toLowerCase())
  );

  const handleSubmit = () => {
    onSubmit(assistData);
  };

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}>
      <div className={`p-6 w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-xl font-semibold mb-4">Request Assistance</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={assistData.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform</label>
          <select
            name="platform"
            value={assistData.platform}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="">Select a platform</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
            <option value="Web">Web</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Source Link</label>
          <input
            type="url"
            name="sourceLink"
            value={assistData.sourceLink}
            onChange={handleInputChange}
            placeholder="Enter project source link (e.g., GitHub)"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Technologies Used (Optional)</label>
          <div className="relative">
            <input
              type="text"
              value={techSearch}
              onChange={handleTechSearch}
              onFocus={() => setIsTechDropdownOpen(true)}
              placeholder="Search technologies..."
              className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            {isTechDropdownOpen && filteredTechnologies.length > 0 && (
              <ul className={`absolute z-10 w-full max-h-40 overflow-y-auto border rounded-md mt-1 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                {filteredTechnologies.map(tech => (
                  <li
                    key={tech}
                    onClick={() => handleTechSelect(tech)}
                    className={`px-3 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {assistData.technologies.map(tech => (
              <span
                key={tech}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}
              >
                {tech}
                <button
                  onClick={() => handleTechRemove(tech)}
                  className={`ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {error && <p className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Request Assist
          </button>
        </div>
      </div>
    </div>
  );
};

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAssistForm, setShowAssistForm] = useState(false);
  const [newRequestData, setNewRequestData] = useState({
    clientId: '',
    projectTitle: '',
    projectDescription: '',
    platform: '',
    purpose: '',
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux

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
    if (!projectTitle.trim() || !platform || !purpose.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const requestData = { ...newRequestData, clientId: user.id };
      await createRequest(requestData, token);
      window.location.reload();
      setShowRequestForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit project request');
    }
  };

  const handleRequestAssist = async (assistData) => {
    const { projectName, platform, sourceLink } = assistData;
    if (!projectName.trim() || !platform || !sourceLink.trim()) {
      setError('All fields are required except technologies');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const assistRequestData = {
        clientId: user.id,
        projectTitle: projectName,
        platform,
        sourceLink,
        technologies: assistData.technologies,
        requestType: 'assist',
      };
      await createRequest(assistRequestData, token);
      window.location.reload();
      setShowAssistForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit assist request');
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

      <div className="relative mb-5 max-w-xs">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        />
      </div>

      {/* Project Request Form Modal */}
      {showRequestForm && (
        <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}>
          <div className={`p-6 rounded-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-xl font-semibold mb-4">Request a New Project</h2>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Title</label>
              <input
                type="text"
                name="projectTitle"
                value={newRequestData.projectTitle}
                onChange={handleInputChange}
                placeholder="Enter project title"
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Description</label>
              <textarea
                name="projectDescription"
                value={newRequestData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your project"
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform</label>
              <select
                name="platform"
                value={newRequestData.platform}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              >
                <option value="">Select a platform</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
                <option value="Web">Web</option>
              </select>
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Purpose</label>
              <textarea
                name="purpose"
                value={newRequestData.purpose}
                onChange={handleInputChange}
                placeholder="What do you need this project for?"
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                rows="3"
              />
            </div>

            {error && <p className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRequestForm(false)}
                className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleRequestProject}
                className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assist Request Form Modal */}
      {showAssistForm && (
        <AssistRequestForm
          onClose={() => setShowAssistForm(false)}
          onSubmit={handleRequestAssist}
          error={error}
        />
      )}

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
                      Once the request is approved, the option will be available
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

      {filteredRequests.length === 0 && (
        <div className={`flex flex-col items-center py-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <Search size={24} />
          <p>{searchTerm ? 'No matching requests' : 'No requests found'}</p>
        </div>
      )}
    </div>
  );
};

export default UserRequest;