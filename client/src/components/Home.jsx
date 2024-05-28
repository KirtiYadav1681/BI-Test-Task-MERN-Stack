import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [groups, setGroups] = useState(null);
  const token = localStorage.getItem('token');

  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [unregisteredEmails, setUnregisteredEmails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !members) return toast.error("All fields are required.")

    try {
      const response = await axios.post('http://localhost:5555/group/create', {
        name,
        members,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Group created successfully and invitation link sent in the mail.")
      setUnregisteredEmails(response.data.unregisteredEmails);
    } catch (error) {
      toast.error("Error creating group");
      console.error('Error creating group:', error.response.data);
    }
  };

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5555/group/user-groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        toast.error("Error fetching group");
        console.error('Error fetching group', error);
      }
    };
    fetchUserGroups();
  }, [token, unregisteredEmails]);

  return (
    <div className="container mx-auto px-8 py-12 flex">
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[400px] pr-8">
        <div className="text-blue-900">
          <h1 className="text-4xl font-bold mb-8">All Groups</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groups &&
              groups.map((group) => (
                <Link
                  key={group._id}
                  to={`/group-expense/${group._id}`}
                  className="group-card flex items-center justify-center bg-blue-200 rounded-lg shadow-md p-6"
                >
                  <span className="text-xl">{group.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-blue-900">
          <h1 className="text-4xl font-bold mb-8">Create a new group</h1>
          <div className="flex flex-col items-center">
            <input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
              type="text"
              placeholder="Enter group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
              type="text"
              placeholder="Add members (comma-separated emails)"
              value={members}
              onChange={(e) => setMembers(e.target.value.split(','))}
              required
            />
            <button className="tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none" onClick={handleSubmit}>
              Create Group
            </button>
          </div>
        </div>
        {unregisteredEmails?.length > 0 && (
        <div>
          <h3>The following users need to register first:</h3>
          <ul>
            {unregisteredEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
