// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { CHILD_API } from '../api';

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log("Dashboard mounted. Token:", token);

    if (!token) {
      navigate('/login');  // No token, redirect to login
      return;
    }

    const fetchChildren = async () => {
      try {
        console.log("Fetching children with token:", token);
        const response = await axios.get(CHILD_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Children fetched:", response.data);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children:', error);
        if (error.response && error.response.status === 401) {
          // Unauthorized: clear storage and redirect
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('username');
          navigate('/login');
        }
      }
    };

    fetchChildren();
  }, [navigate]);  // Removed token from deps to avoid premature read

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <h2>Welcome, {username}!</h2>
      <h3>Your Children</h3>
      {children.length === 0 ? (
        <p>No child profiles found. Please add a child profile.</p>
      ) : (
        <ul>
         <ul>
                {children.map((child) => (
                  <li key={child.id}>
                    <button onClick={() => navigate(`/child/${child.id}`)}>
                      <strong>Name:</strong> {child.name} | <strong>Age:</strong> {child.age}
                    </button>
                  </li>
          ))}
        </ul>

        </ul>
      )}
      <button onClick={() => navigate('/add-child')}>
        Add New Child
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
