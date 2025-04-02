import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRequests,getRequestsByUserId } from '../services/requestService';
import { Clock, Search, Check, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  }, []);

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


  if (loading) return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-5 w-full mt-10 text-black">
      <h1 className="flex items-center gap-2 mb-5 text-2xl">
        <Search className="w-5 h-5" />
        Your Requests
      </h1>

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
                    {request.projectStatus == "pending" ? (<p>Once the request appoved the option will avilable</p> ): (  <button
                    onClick={() => handleViewProgress(request.projectStatusUrl)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={14} /> View Progress
                  </button>)}
               
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