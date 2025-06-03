// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CHILD_API } from '../api';

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchChildren = async () => {
      try {
        const response = await axios.get(CHILD_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChildren(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('username');
          navigate('/login');
        }
      }
    };

    fetchChildren();
  }, [navigate]);

  const purpleButtonStyle = {
    backgroundColor: '#6f42c1',
    borderColor: '#6f42c1',
    color: 'white',
  };

  const purpleOutlineButtonStyle = {
    borderColor: '#6f42c1',
    color: '#6f42c1',
  };

  return (
    <div style={{ backgroundColor: '#f5f0ff', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <h2 className="text-primary mb-1">Welcome, {username} 🌟</h2>
          <p className="text-muted">Manage your children's learning profiles from here.</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-dark">Your Children</h4>
          <button
            className="btn"
            style={purpleButtonStyle}
            onClick={() => navigate('/add-child')}
          >
            + Add Child
          </button>
        </div>

        {children.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            No child profiles found. Start by adding a new one.
          </div>
        ) : (
          <div className="row">
            {children.map((child) => (
              <div className="col-md-4" key={child.id}>
                <div className="card shadow-sm mb-4 border-0">
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#6f42c1' }}>{child.name}</h5>
                    <p className="card-text"><strong>Age:</strong> {child.age}</p>
                    <button
                      className="btn"
                      style={purpleOutlineButtonStyle}
                      onClick={() => navigate(`/child/${child.id}/dashboard`)}
                    >
                      Open Dashboard
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
