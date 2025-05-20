// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { REGISTER_API } from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REGISTER_API, formData);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        let msg = "Registration failed:\n";
        for (let field in errors) msg += `${field}: ${errors[field]}\n`;
        setMessage(msg);
      } else setMessage("Registration failed. Unknown error.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required /><br />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
