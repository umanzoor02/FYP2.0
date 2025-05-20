// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwtToken'); // remove token
    navigate('/login'); // redirect to login
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
