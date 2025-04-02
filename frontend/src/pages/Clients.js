import React, { useEffect, useState } from 'react';
import getAllClients from '../services/userService';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="font-sans text-black p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-center">Clients List</h2>
      <ul className="list-none p-0">
        {clients.length > 0 ? (
          clients.map(client => (
            <li key={client._id} className="bg-white mb-2 p-4 rounded shadow">
              {client.name} - {client.email}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No clients found.</p>
        )}
      </ul>
    </div>
  );
};

export default Clients;
