// src/components/AddChildForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { CHILD_API } from '../api';
import { useNavigate } from 'react-router-dom';

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
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('Failed to create child profile.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Child Profile</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Child's Name"
          required
        /><br />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        /><br />
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default AddChildForm;
