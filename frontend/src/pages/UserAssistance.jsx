import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  getUserAssistRequests, 
  payAssistRequest, 
  submitFeedback 
} from '../services/assistRequestService';
import { Clock, Check, Phone, User, Star, DollarSign, Eye, X } from 'lucide-react'; // Added DollarSign, Eye, X
import { motion, AnimatePresence } from 'framer-motion';

const UserAssistance = () => {
  const [assistRequests, setAssistRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReq, setSelectedReq] = useState(''); // Updated to use selectedReq
  const [transactionId, setTransactionId] = useState(''); // State for transaction ID input
  const { user } = useSelector((state) => state.user);
  console.log("user:", user);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const fetchAssistRequests = async () => {
      try {
        const data = await getUserAssistRequests(user.id);
        setAssistRequests(data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch assist requests');
        setLoading(false);
      }
    };

    fetchAssistRequests();
  }, [user?.id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePayment = (requestId) => {
    const request = assistRequests.find(req => req._id === requestId);
    setSelectedReq(request); // Set the full request data
    setTransactionId(''); // Reset transaction ID input
  };

  console.log("S:", selectedReq._id)

  const handlePaymentSubmit = async (requestId, paymentType) => {
    if (!transactionId.trim()) {
      setError('Please enter a transaction ID');
      return;
    }

    

    try {
      const updatedRequest = await payAssistRequest(selectedReq._id, paymentType, transactionId);
      setAssistRequests(prev =>
        prev.map(req => (req._id === requestId ? updatedRequest : req))
      );
      setSelectedReq(null); // Clear the selected request
      setError(null);
      
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Payment submission failed');
    }
  };

  const handleFeedback = async (requestId) => {
    const feedback = prompt('Enter your feedback:');
    const rating = parseInt(prompt('Enter rating (1-5):'), 10);
    if (!feedback || !rating || rating < 1 || rating > 5) {
      setError('Please provide valid feedback and a rating between 1-5');
      return;
    }

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

  if (error) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-red-400 bg-gray-900' : 'text-red-500 bg-white'}`}>
      {error}
    </div>
  );

  return (
    <div className={`container mx-auto p-5 w-full mt-16 ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <h1 className="text-3xl font-bold mb-6">Your Assist Requests</h1>

      {assistRequests.length === 0 ? (
        <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No assist requests found.
        </p>
      ) : (
        <div className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Project Name</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Requested Date</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Request Status</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Assist Status</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Payment Status</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Amount</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Developer Name</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Developer Phone</th>
                <th className={`py-3 px-4 text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistRequests.map(request => (
                <tr key={request._id} className={`border-b ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="py-3 px-4">{request.projectName}</td>
                  <td className="py-3 px-4">{formatDate(request.createdAt)}</td>
                  <td className="py-3 px-4">
                    {request.requestStatus === 'Pending' || request.requestStatus === 'Reviewing' ? (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
                        <Clock size={14} /> {request.requestStatus}
                      </span>
                    ) : request.requestStatus === 'Approved' ? (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
                        <Check size={14} /> Approved
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                        Declined
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{request.assistStatus}</td>
                  <td className="py-3 px-4">
                    {request.paymentStatus === 'Paid' ? (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
                        <DollarSign size={14} /> Paid
                      </span>
                    ) : request.paymentStatus === 'Pending' && request.transactionId ? (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`}>
                        <Eye size={14} /> Reviewing Payment
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{request.amount ? `$${request.amount}` : 'N/A'}</td>
                  <td className="py-3 px-4">
                    {request.developerName ? (
                      <span className="flex items-center gap-1">
                        <User size={14} /> {request.developerName}
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {request.developerPhone ? (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {request.developerPhone}
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {request.requestStatus === 'Approved' && request.paymentStatus === 'Pending' && !request.transactionId && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePayment(request._id)}
                          className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                          Google Pay
                        </button>
                        <button
                          onClick={() => handlePayment(request._id, 'Razorpay')}
                          className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          Razorpay
                        </button>
                      </div>
                    )}
                    {request.paymentStatus === 'Paid' && request.assistStatus === 'Completed' && !request.feedback && (
                      <button
                        onClick={() => handleFeedback(request._id)}
                        className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                      >
                        Submit Feedback
                      </button>
                    )}
                    {request.feedback && (
                      <span className="flex items-center gap-1 text-green-500">
                        <Star size={14} /> {request.rating} - Feedback Submitted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Google Pay QR Code Modal */}
      <AnimatePresence>
        {selectedReq && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`p-6 w-full max-w-md rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Google Pay Payment</h2>
                <button
                  onClick={() => setSelectedReq(null)}
                  className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                >
                  <X size={20} />
                </button>
              </div>

              {selectedReq.paymentQrCode ? (
                <div className="mb-4">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Scan the QR code to pay:</p>
                  <img
                    src={selectedReq.paymentQrCode}
                    alt="Google Pay QR Code"
                    className="w-full h-48 object-contain mt-2 rounded-md"
                  />
                </div>
              ) : (
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No QR code provided by admin.</p>
              )}

              <div className="mb-4">
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                  className={`w-full mt-1 p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                />
              </div>

              {error && (
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{error}</p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedReq(null)}
                  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePaymentSubmit(selectedReq._id, 'Google Pay')}
                  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAssistance;