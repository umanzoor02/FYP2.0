// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('jwtToken');

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

      {!token && (
        <>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        </>
      )}

      {token && (
        <>
          <Link to="/add-child" style={{ marginRight: '10px' }}>Add Child</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
