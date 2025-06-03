import React, { useState } from 'react';
import axios from 'axios';
import { CHILD_API } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const AddChildForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setMessage('You must be logged in to add a child.');
      return;
    }

    try {
      await axios.post(CHILD_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('Failed to create child profile.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e6e0f8' }}>

      {/* Form card */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: 'calc(100vh - 56px)' /* subtract navbar height */ }}
      >
        <div
          className="card shadow p-4"
          style={{ maxWidth: '400px', width: '100%', borderRadius: '12px' }}
        >
          <h2 className="mb-4 text-center" style={{ color: '#6f42c1' }}>
            Create Child Profile
          </h2>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label"
                style={{ color: '#6f42c1' }}
              >
                Child's Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter child's name"
                className="form-control"
                required
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="form-label"
                style={{ color: '#6f42c1' }}
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="form-control"
                required
                min={0}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: '#6f42c1',
                borderColor: '#6f42c1',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(111, 66, 193, 0.4)',
              }}
            >
              Add Child
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChildForm;
